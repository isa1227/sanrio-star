<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $table = 'detalles_pedidos';

    protected $primaryKey = 'detalle_pedido_id'; // ✔ PRIMARY KEY correcta
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'precio',
        'cantidad'
    ];

    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'pedido_id', 'pedido_id'); // ✔ relación correcta
    }
}
