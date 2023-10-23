<?php

namespace User\Application\Action;

use Exception;
use stdClass;
use User\Domain\Dto\TokenUserDto;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class RefreshTokenAction
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

            $tokenDto = new TokenUserDto();

            // Handle Token
            $data = $tokenDto::fromArray($json, true);
            $refreshToken = $data->getRefreshToken();

            // Validate Refresh Token
            $validateRefresh = $tokenDto::decodeToken($refreshToken);
            if ($validateRefresh->isLoggin) {

                $user = new stdClass();
                $user->email = $validateRefresh->email;
                $user->iduser = $validateRefresh->id;

                $tokenDto->generateTokenAccessAndRefresh($user);
            } else {
                echo json_encode(['message' => $validateRefresh]);
            }
        } catch (Exception $error) {
            http_response_code($error->getCode());
            echo json_encode(['message' => $error->getMessage()]);
        }
    }
}

$refreshToken = new RefreshTokenAction();
$refreshToken->run();
