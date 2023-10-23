<?php

namespace User\Application\Action;

use Database\Connection;
use Exception;
use User\Domain\Dto\CreateUserDto;
use User\Domain\Services\LoginUserService;
use User\Infrastructure\Repository\UserRepositoryFromPDO;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';


class LoginUserAction
{
    public function run(): void
    {

        try {
            if ($_SERVER['REQUEST_METHOD'] !== "POST") {
                throw new Exception("Método {$_SERVER['REQUEST_METHOD']} Não Autorizado", 403);
            }

            // Get Input
            $input = file_get_contents('php://input');
            $json = json_decode($input, true);

            // Validate Input
            $data = CreateUserDto::fromArray($json, true);

            $connection = Connection::connect();
            $repository = new UserRepositoryFromPDO($connection);
            $service = new LoginUserService($repository);

            $service->login($data);
        } catch (Exception $error) {
            http_response_code($error->getCode());
            echo json_encode(['message' => $error->getMessage()]);
        }
    }
}



$loginUser = new LoginUserAction();
$loginUser->run();
