<?php

namespace App\Services\Auth\Enums;

enum AuthType: string
{
    case Admin = 'api_admin';
    case User = 'api';
}
