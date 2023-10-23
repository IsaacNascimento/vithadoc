<?php

namespace Tasks\Domain\Repository;

use Tasks\Domain\Dto\CreateTaskDto;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

interface TasksInterfaces
{

    public function get(string $userid): array;
    public function getById(string $id, string $userid): array;
    public function create(CreateTaskDto $data): void;
    public function delete(int $id, int $userid): void;
    public function update(int $id, CreateTaskDto $data): void;
}
