<?php

namespace Tasks\Domain\Dto;

use Exception;

require dirname(__DIR__, 4) . '/vendor/autoload.php';

class CreateTaskDto
{
    private string $descricao;
    private string $nome;
    private string $iduser;

    public static function fromArray(array $data): self
    {
        self::validate($data);
        $instance = new self;

        $instance->nome = $data['nome'];
        $instance->descricao = $data['descricao'];
        $instance->iduser = $data['iduser'];

        return $instance;
    }

    public function getNome(): string
    {
        return $this->nome;
    }

    public function getDescricao(): string
    {
        return $this->descricao;
    }

    public function getIdUser(): string
    {
        return $this->iduser;
    }

    private static function validate(array $data): void
    {
        $nome = $data['nome'];
        if (!isset($nome)) {
            throw new Exception('Nome é obrigatório!', 400);
        }

        if (strlen($nome) > 30) {
            throw new Exception('Nome extenso', 400);
        }

        if (trim($nome) === '') {
            throw new Exception('Nome não deve ser vazio!', 400);
        }


        $descricao = $data['descricao'];
        if (!isset($descricao)) {
            throw new Exception('Descrição é obrigatório!', 400);
        }

        if (strlen($descricao) > 75) {
            throw new Exception('Descrição extenso', 400);
        }

        if (trim($descricao) === '') {
            throw new Exception('Descrição não deve ser vazio!', 400);
        }
    }
}
