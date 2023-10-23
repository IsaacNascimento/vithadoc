<?php

namespace Tasks\Application\Action;

use Database\Connection;

use Exception;
use Tasks\Domain\Dto\CreateTaskDto;
use Tasks\Infrasctructure\Repository\TaskRepositoryFromPDO;
use Tasks\Domain\Services\CreateTaskService;

require_once dirname(__DIR__, 3) . '/User/Application/Action/ValidateUser.php';

use User\Application\Action\ValidateUserAction;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class CreateTaskAction
{
    public function run(): void
    {
        $validateRoute = new ValidateUserAction();
        $isUserValidate = $validateRoute->run();

        if ($isUserValidate->isLoggin) {
            $iduser = $isUserValidate->id;

            try {
                if ($_SERVER['REQUEST_METHOD'] !== "POST") {
                    throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 403);
                }

                // Get Input
                $input = file_get_contents('php://input');
                $json = json_decode($input, true);

                $json['iduser'] = $iduser;
                // Validate Input
                $data = CreateTaskDto::fromArray($json);

                // Database Connection
                $connection = Connection::connect();
                $repository = new TaskRepositoryFromPDO($connection);

                // SQL
                $service = new CreateTaskService($repository);
                $service->save($data);

                echo json_encode(['message' => 'Criado com Sucesso!']);
            } catch (Exception $error) {
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        } else {
            echo json_encode(['message' => $isUserValidate]);
        }
    }
}



$createTask = new CreateTaskAction();
$createTask->run();
