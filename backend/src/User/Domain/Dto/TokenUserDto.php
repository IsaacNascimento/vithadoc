<?php

namespace User\Domain\Dto;

use Dotenv\Dotenv;
use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
use stdClass;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

$rootDirectory = dirname(__DIR__, 4);
$dotenv = Dotenv::createImmutable($rootDirectory);
$dotenv->load();

class TokenUserDto
{
    private string $refreshToken;
    public static function fromArray(array $data): self
    {

        $instance = new self;
        $instance->refreshToken = $data['refresh'];

        return $instance;
    }

    public function getRefreshToken(): string
    {
        return $this->refreshToken;
    }
    public static function generateToken(mixed $user, int $timeToExpire): string
    {
        try {
            $key = $_ENV['JWT_KEY'];
            $payload = [
                "exp" => time() + $timeToExpire,
                "iat" => time(),
                "email" => $user->email,
                "id" => $user->iduser,
            ];

            $jwt = JWT::encode($payload, $key, 'HS256');
            return $jwt;
        } catch (Exception $error) {
            throw new Exception($error, 400);
        }
    }

    public static function decodeToken(string $token): object | string
    {
        try {
            $key = $_ENV['JWT_KEY'];
            $decodedToken = JWT::decode($token, new Key($key, 'HS256'));
            $decodedToken->{'isLoggin'} = true;
            return $decodedToken;
        } catch (Exception $error) {
            http_response_code(401);
            return $error->getMessage();
        }
    }

    public static function checkAuthorizationHeader(): string | null
    {
        $authorization = $_SERVER["HTTP_AUTHORIZATION"];
        if ($authorization) {
            $token = str_replace('Bearer ', '', $authorization);
            return $token;
        } else {
            http_response_code(401);
            echo json_encode(['message' => 'Usuário não autenticado', 'isLoggin' => false]);
            return null;
        }
    }

    public static function generateTokenAccessAndRefresh(mixed $user): void
    {
        $token = self::generateToken($user, 3600);
        $refresh = self::generateToken($user, 7200);

        if ($token && $refresh) {
            $data = [
                "access" => $token,
                "refresh" => $refresh,
                "isLogin" => true,
            ];
            http_response_code(200);
            echo json_encode($data);
        } else {
            http_response_code(500);
            echo json_encode("Erro Interno");
        }
    }
}
