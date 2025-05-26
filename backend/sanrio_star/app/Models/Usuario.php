<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Usuario extends Model
{
    protected $table = 'usuarios';

    protected $fillable = [
    'nombre_usuario',
    'correo',
    'contrasena',
    'rol_id',
    'direccion_envio',
    'direccion_facturacion',
];


    public $timestamps = false;
}
