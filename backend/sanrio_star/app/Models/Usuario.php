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
    'direccion_envio',
    'direccion_facturacion',
    'rol_id',
    'ultima_actualizacion',
];


    public $timestamps = false;
}
