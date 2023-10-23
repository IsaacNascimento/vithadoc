<?php

namespace Tasks\Application\Action;

use Database\Connection;

use Exception;
use Tasks\Domain\Dto\CreateTaskDto;
use Tasks\Domain\Services\UpdateTaskService;
use Tasks\Infrasctructure\Repository\TaskRepositoryFromPDO;

require_once dirname(__DIR__, 3) . '/User/Application/Action/ValidateUser.php';

use User\Application\Action\ValidateUserAction;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class UpdateTaskAction
{
    public function run(): void
    {
        $validateRoute = new ValidateUserAction();
        $isUserValidate = $validateRoute->run();

        if ($isUserValidate->isLoggin) {
            $iduser = $isUserValidate->id;
            try {
                if ($_SERVER['REQUEST_METHOD'] !== "PUT") {
                    throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 400);
                }

                $getId = filter_input(INPUT_GET, 'id');

                // Get Input
                $input = file_get_contents('php://input');
                $json = json_decode($input, true);

                $json['iduser'] = $iduser;

                // Validate Input
                $data = CreateTaskDto::fromArray($json);

                // Database
                $connection = Connection::connect();
                $repository = new TaskRepositoryFromPDO($connection);

                $service = new UpdateTaskService($repository);
                $service->update($getId, $data);
            } catch (Exception $error) {
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        } else {
            echo json_encode(['message' => $isUserValidate]);
        }
    }
}

$updateTask = new UpdateTaskAction();
$updateTask->run();
