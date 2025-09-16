<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
    // Nombre de la tabla
    protected $table = 'categorias_productos';

    // Clave primaria
    protected $primaryKey = 'categoria_id';

    // Laravel maneja created_at y updated_at automáticamente si están; si no, desactivamos
    public $timestamps = false;

    // Campos que se pueden llenar masivamente
    protected $fillable = [
        'nombre_categoria',
        'descripcion',
        'ultima_actualizacion'
    ];
}
