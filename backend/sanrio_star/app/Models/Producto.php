<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos';
    protected $primaryKey = 'producto_id';
    public $timestamps = false;

    protected $fillable = [
        'nombre_producto',
        'descripcion',
        'precio',
        'categoria_id',
        'url_imagen',
        'personajes',
        'ultima_actualizacion'
    ];
}
