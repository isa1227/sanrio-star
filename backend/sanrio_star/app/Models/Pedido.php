<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $primaryKey = 'pedido_id'; // ✔ la PK real
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'total',
        'estado'
    ];

    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'pedido_id', 'pedido_id');
    }
}
