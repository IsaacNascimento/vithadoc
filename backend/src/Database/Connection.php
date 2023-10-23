<?php

namespace Database;

use PDO;
use Dotenv\Dotenv;

require dirname(__DIR__, 2) . '/vendor/autoload.php';

$rootDirectory = dirname(__DIR__, 2);
$dotenv = Dotenv::createImmutable($rootDirectory);
$dotenv->load();

class Connection
{
    public static function connect()
    {
        $db_host = $_ENV['DB_HOST'];
        $db_name = $_ENV['DB_NAME'];
        $db_user = $_ENV['DB_USER'];
        $db_password = $_ENV['DB_PASSWORD'];

        return new PDO(
            "mysql:host=$db_host;dbname=$db_name; charset=utf8mb4",
            $db_user,
            $db_password,
            [
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ
            ]
        );
    }
}
