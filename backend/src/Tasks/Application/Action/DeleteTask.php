<?php

namespace Tasks\Application\Action;

use Exception;
use Database\Connection;
use Tasks\Infrasctructure\Repository\TaskRepositoryFromPDO;
use Tasks\Domain\Services\DeleteTaskService;

require_once dirname(__DIR__, 3) . '/User/Application/Action/ValidateUser.php';

use User\Application\Action\ValidateUserAction;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class DeleteTaskAction
{
    public function run(): void
    {
        $validateRoute = new ValidateUserAction();
        $isUserValidate = $validateRoute->run();

        if ($isUserValidate->isLoggin) {
            $iduser = $isUserValidate->id;
            try {
                if ($_SERVER['REQUEST_METHOD'] !== "DELETE") {
                    throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 403);
                }

                $getId = filter_input(INPUT_GET, 'id');

                $connection = Connection::connect();
                $repository = new TaskRepositoryFromPDO($connection);
                $service = new DeleteTaskService($repository);
                $service->delete($getId, $iduser);
            } catch (Exception $error) {
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        } else {
            echo json_encode(['message' => $isUserValidate]);
        }
    }
}

$deleteTask = new DeleteTaskAction();
$deleteTask->run();
