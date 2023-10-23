<?php

namespace User\Domain\Services;

use User\Domain\Dto\CreateUserDto;
use User\Domain\Repository\UserInterface;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class LoginUserService
{
    public function __construct(
        private UserInterface $userInterfaceRepository
    ) {
    }

    public function login(CreateUserDto $data): void
    {
        $this->userInterfaceRepository->login($data);
    }
}
