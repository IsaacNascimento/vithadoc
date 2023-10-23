<?php

namespace User\Domain\Dto;

use Exception;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class CreateUserDto
{
    private string $username;
    private string $email;
    private string $password;

    public static function fromArray(array $data, bool $isLogin = false): self
    {
        self::validate($data, $isLogin);
        $instance = new self;
        $instance->username = !$isLogin ? $data['name'] : "";
        $instance->email = $data['email'];
        $instance->password = $data['password'];

        return $instance;
    }

    public function getName(): string
    {
        return $this->username;
    }

    public function getEmail(): string
    {
        return $this->email;
    }

    public function getPassword(): string
    {
        return $this->password;
    }

    public function hashPassword(): string
    {
        $password = $this->getPassword();
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);
        return $hashed_password;
    }

    private static function validate(array $data, bool $isLogin): void
    {
        if (!$isLogin) {
            $username = $data['name'];
            self::handleMessageValidate($username, "Nome", 45);
        }

        $email = $data['email'];
        self::handleMessageValidate($email, "Email", 50, true);

        $password = $data['password'];
        self::handleMessageValidate($password, "Senha", 50);
    }

    private static function handleMessageValidate($field, string $fieldName, int $valueField, bool $isEmail = false): void
    {
        if (!isset($field)) {
            throw new Exception("$fieldName é obrigatório!", 400);
        }

        if (strlen($field) > $valueField) {
            throw new Exception("$fieldName extenso", 400);
        }

        if (trim($field) === '') {
            throw new Exception("$fieldName não deve ser vazio!", 400);
        }

        if ($isEmail) {
            if (!filter_var($field, FILTER_VALIDATE_EMAIL)) {
                throw new Exception("Escreva um email válido no campo $fieldName!", 400);
            }
        }
    }
}
