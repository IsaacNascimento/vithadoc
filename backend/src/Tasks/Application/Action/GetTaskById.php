<?php

namespace Tasks\Application\Action;

use Exception;
use Database\Connection;
use Tasks\Domain\Services\GetTaskByIDService;
use Tasks\Infrasctructure\Repository\TaskRepositoryFromPDO;

require_once dirname(__DIR__, 3) . '/User/Application/Action/ValidateUser.php';

use User\Application\Action\ValidateUserAction;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class GetTaskByIdAction
{
    public function run(): void
    {
        $validateRoute = new ValidateUserAction();
        $isUserValidate = $validateRoute->run();

        if ($isUserValidate->isLoggin) {
            $iduser = $isUserValidate->id;

            try {
                if ($_SERVER['REQUEST_METHOD'] !== "GET") {
                    throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 403);
                }

                $getId = filter_input(INPUT_GET, 'id');

                // Database Connection
                $connection = Connection::connect();
                $repository = new TaskRepositoryFromPDO($connection);

                // SQL
                $service = new GetTaskByIDService($repository);
                $task = $service->getById($getId, $iduser);

                echo json_encode(['result' => $task]);
            } catch (Exception $error) {
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        } else {
            echo json_encode(['message' => $isUserValidate]);
        }
    }
}

$getTask = new GetTaskByIdAction();
$getTask->run();
