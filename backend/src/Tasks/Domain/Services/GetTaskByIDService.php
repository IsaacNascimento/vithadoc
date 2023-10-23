<?php

namespace Tasks\Domain\Services;

use Tasks\Domain\Repository\TasksInterfaces;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class GetTaskByIDService
{
    public function __construct(
        private TasksInterfaces $tasksInterfacesRepository
    ) {
    }

    public function getById(string $id, string $userid): array
    {
        $task = $this->tasksInterfacesRepository->getById($id, $userid);
        return $task;
    }
}
