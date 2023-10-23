<?php

namespace Tasks\Infrasctructure\Repository;

use PDO;
use Tasks\Domain\Dto\CreateTaskDto;
use Tasks\Domain\Repository\TasksInterfaces;
use Exception;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class TaskRepositoryFromPDO implements TasksInterfaces
{
    public function __construct(private PDO $database)
    {
        // print($database);
    }
    public function get(string $iduser): array
    {
        try {
            //code...
            $sql = "SELECT * FROM task WHERE iduser = $iduser";
            $query = $this->database->query($sql);
            $tasks = array();
            while ($row = $query->fetch()) {
                if (!$row) {
                    http_response_code(404);
                    return array("message" => "Tarefas não encontradas");
                }
                array_push($tasks, $row);
            };
            return $tasks;
        } catch (Exception $error) {
            print("Erro ao carregar às tarefas $error");
            throw new Exception($error, 400);
        }
    }

    public function getById(string $id, string $userid): array
    {
        try {
            if ($this->idExists($id, $userid)) {
                $task = array();
                $sql = "SELECT * FROM task t WHERE t.idtask=$id";
                $query = $this->database->query($sql);
                if ($query) {
                    $task = $query->fetch(PDO::FETCH_ASSOC);

                    if (!$task) {
                        http_response_code(404);
                        return array("message" => "Tarefa $id não encontrada");
                    };
                };
                return $task;
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Tarefa $id não encontrada"]);
            }
        } catch (Exception $error) {
            // print("Erro ao carregar a tarefa $id: $error");
            throw new Exception($error, 400);
        }
    }

    public function create(CreateTaskDto $data): void
    {

        $name = $data->getNome();
        $description = $data->getDescricao();
        $iduser = $data->getIdUser();

        try {
            $sql = "INSERT INTO task(name, description, iduser) VALUES (:name, :description, :iduser)";
            $query = $this->database->prepare($sql);
            $query->execute([':name' => $name, ':description' => $description, ':iduser' => $iduser]);
        } catch (Exception $error) {
            // print("Erro ao Criar $error");
            throw new Exception($error, 400);
        }
    }

    public function update(int $id, CreateTaskDto $data): void
    {
        $iduser = $data->getIdUser();
        try {
            if ($this->idExists($id, $iduser)) {
                $data = [
                    ':name' => $data->getNome(),
                    ':description' => $data->getDescricao(),
                    ':id' => $id,
                ];
                $sql = "UPDATE task SET name= :name, description= :description WHERE idtask= :id";
                $query = $this->database->prepare($sql);
                $query->execute($data);
                http_response_code(204);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Tarefa $id não encontrada"]);
            }
        } catch (Exception $error) {
            print("Erro ao atualizar a tarefa $id: $error");
            throw new Exception($error, 400);
        }
    }

    public function delete(int $id, int $iduser): void
    {
        try {
            if ($this->idExists($id, $iduser)) {
                $sql = "DELETE FROM task t WHERE t.idtask= :id";
                $query = $this->database->prepare($sql);
                $query->bindParam(':id', $id, PDO::PARAM_INT);
                $result = $query->execute();

                if ($result) {
                    http_response_code(204); // No Content
                } else {
                    http_response_code(400); // Bad Request
                    echo json_encode(["message" => "Erro ao deletar a tarefa $id"]);
                }
            } else {
                http_response_code(404); // Not Found
                echo json_encode(["message" => "Tarefa $id não encontrada"]);
            }
        } catch (Exception $error) {
            // print("Erro ao deletar a tarefa $id: $error");
            throw new Exception($error, 400);
        }
    }

    public function idExists(string $idtask, string $iduser): bool
    {
        $sql = "SELECT COUNT(*) FROM task WHERE idtask = :idtask AND iduser = :iduser";
        $query = $this->database->prepare($sql);
        $query->bindParam(':idtask', $idtask, PDO::PARAM_INT);
        $query->bindParam(':iduser', $iduser, PDO::PARAM_INT);
        $query->execute();
        $count = $query->fetchColumn();

        return $count > 0;
    }
}
