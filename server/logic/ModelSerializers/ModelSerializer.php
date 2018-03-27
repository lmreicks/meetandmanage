<?php

namespace Logic;

abstract class ModelSerializer {
    public $errors;

    abstract protected function toApi($model);
    abstract protected function toApiList($models);
    abstract protected function toServer($model);
    abstract protected function toServerList($models);
}