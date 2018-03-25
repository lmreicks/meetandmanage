<?php

namespace Logic\ModelSerializers;

use Logic\ModelSerializers\ModelSerializer;
use Models\User;

class UserSerializer extends ModelSerializer {

    function toApi($user) {
        $apiUser = new \stdClass;
        $apiUser->Id = $user->id;
        $apiUser->Email = $user->email;
        $apiUser->Name = $user->name;
        return $apiUser;
    }

    function toApiList($users) {
        $apiUsers = array();

        foreach ($users as $user) {
            $apiUser = $this->toApi($user);
            array_push($apiUsers, $apiUser);
        }

        return $apiUsers;
    }

    function toServer($apiUser) {
        $user = new User;

        $user->id = $apiUser->Id;
        $user->email = $apiUser->Email;
        $user->name = $apiUser->Name;

        return $user;
    }

    function toServerList($apiUsers) {
        $users = array();

        foreach ($apiUsers as $apiUser) {
            $user = $this->toServer($apiUser);
            array_push($users, $user);
        }

        return $users;
    }
}

?>