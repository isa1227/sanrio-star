<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $table = 'productos'; // nombre de la tabla
    protected $primaryKey = 'producto_id'; // clave primaria

    public $timestamps = false; // si no usas created_at y updated_at

    protected $fillable = [
        'nombre_producto',
        'descripcion',
        'precio',
        'categoria_id',
        'cantidad_minima',
        'cantidad_maxima',
        'url_imagen',
        'personajes'
    ];
}
