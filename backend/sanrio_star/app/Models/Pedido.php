<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';
    protected $primaryKey = 'pedido_id';
    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'total',
        'total_productos',
        'costo_envio',
        'metodo_envio_id',
        'metodo_pago_id',
        'estado'
    ];
}
