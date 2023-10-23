<?php

namespace Tasks\Domain\Services;

use Tasks\Domain\Repository\TasksInterfaces;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class DeleteTaskService
{
    public function __construct(
        private TasksInterfaces $tasksInterfacesRepository
    ) {
    }

    public function delete(int $id, int $userid): void
    {
        $this->tasksInterfacesRepository->delete($id, $userid);
    }
}
