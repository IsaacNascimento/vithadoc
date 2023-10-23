<?php

namespace User\Domain\Repository;

use User\Domain\Dto\CreateUserDto;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

interface UserInterface
{
    public function create(CreateUserDto $data): void;
    public function login(CreateUserDto $data): void;
}
