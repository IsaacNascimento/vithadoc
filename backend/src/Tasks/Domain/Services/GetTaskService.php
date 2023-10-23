<?php

namespace Tasks\Domain\Services;

use Tasks\Domain\Repository\TasksInterfaces;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class GetTaskService
{
    public function __construct(
        private TasksInterfaces $tasksInterfacesRepository
    ) {
    }

    public function getList(string $iduser): array
    {
        $list = $this->tasksInterfacesRepository->get($iduser);
        return $list;
    }
}
