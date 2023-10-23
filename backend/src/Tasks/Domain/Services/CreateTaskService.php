<?php

namespace Tasks\Domain\Services;

use Tasks\Domain\Dto\CreateTaskDto;
use Tasks\Domain\Repository\TasksInterfaces;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class CreateTaskService
{
    public function __construct(
        private TasksInterfaces $tasksInterfacesRepository
    ) {
    }

    public function save(CreateTaskDto $data): void
    {
        $this->tasksInterfacesRepository->create($data);
    }
}
