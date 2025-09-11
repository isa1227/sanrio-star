<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuario extends Authenticatable
{
    protected $table = 'usuarios';
    protected $primaryKey = 'usuario_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre_usuario',
        'correo',
        'contrasena',
        'rol_id',
        'ultima_actualizacion'
    ];

    protected $hidden = ['contrasena', 'remember_token'];
}
