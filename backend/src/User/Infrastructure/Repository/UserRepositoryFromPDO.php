<?php

namespace User\Infrastructure\Repository;

use PDO;

use Exception;
use User\Domain\Dto\CreateUserDto;
use User\Domain\Dto\TokenUserDto;
use User\Domain\Repository\UserInterface;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class UserRepositoryFromPDO implements UserInterface
{
    public function __construct(private PDO $database)
    {
    }

    public function create(CreateUserDto $data): void
    {
        try {
            $username = $data->getName();
            $email = $data->getEmail();
            $password = $data->hashPassword();

            $data = [
                ":name" => $username,
                ":email" => $email,
                ":password" => $password
            ];

            $sql = "INSERT INTO user(name, email, password) VALUES (:name, :email, :password)";
            $query = $this->database->prepare($sql);
            $query->execute($data);
        } catch (Exception $error) {
            //throw $th;
            throw new Exception($error, 400);
        }
    }

    public function login(CreateUserDto $data): void
    {
        try {
            $email = $data->getEmail();
            $password = $data->getPassword();

            $data = [
                ":email" => $email,
            ];

            $sql = "SELECT * FROM user WHERE email = :email";
            $query = $this->database->prepare($sql);
            $query->bindParam(':email', $email, PDO::PARAM_STR);
            $query->execute($data);
            $user = $query->fetch();

            if ($user && password_verify($password, $user->password)) {

                $tokenUser = new TokenUserDto();
                $tokenUser->generateTokenAccessAndRefresh($user);
            } else {
                http_response_code(401);
                echo json_encode(["message" => "Email ou Senha Incorretos"]);
            }
        } catch (Exception $error) {
            throw new Exception($error, 400);
        }
    }
}
