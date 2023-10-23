<?php

namespace User\Application\Action;

use Exception;
use User\Domain\Dto\TokenUserDto;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

require_once  dirname(__DIR__, 3) . '/Settings/Cors.php';

class ValidateUserAction
{
    public function run(): mixed
    {
        $tokenService = new TokenUserDto();
        $token = $tokenService->checkAuthorizationHeader();

        if ($token) {
            try {
                $authUser = $tokenService->decodeToken($token);
                if ($authUser) {
                    return $authUser;
                } else {
                    return $authUser;
                }
            } catch (Exception $error) {
                http_response_code($error->getCode());
                echo json_encode(['message' => $error->getMessage()]);
            }
        }
    }
}

$validateUser = new ValidateUserAction();
$validateUser->run();
