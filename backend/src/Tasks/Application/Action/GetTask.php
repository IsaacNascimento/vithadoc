<?php

namespace Tasks\Application\Action;

use Database\Connection;
use Tasks\Infrasctructure\Repository\TaskRepositoryFromPDO;
use Exception;
use Tasks\Domain\Services\GetTaskService;

require_once dirname(__DIR__, 3) . '/User/Application/Action/ValidateUser.php';

use User\Application\Action\ValidateUserAction;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class GetTaskAction
{
    public function run(): void
    {

        $validateRoute = new ValidateUserAction();
        $isUserValidate = $validateRoute->run();

        // echo json_encode($isUserValidate);

        if ($isUserValidate->isLoggin) {
            $iduser = $isUserValidate->id;
            try {
                if ($_SERVER['REQUEST_METHOD'] !== "GET") {
                    throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 403);
                }

                $connection = Connection::connect();
                $repository = new TaskRepositoryFromPDO($connection);
                $service = new GetTaskService($repository);
                $tasks = $service->getList($iduser);
                echo json_encode(['result' => $tasks]);
            } catch (Exception $error) {
                //throw $th;
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        } else {
            echo json_encode(['message' => $isUserValidate]);
        }
    }
}

$getTask = new GetTaskAction();
$getTask->run();
