<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DetallePedido extends Model
{
    protected $table = 'detalles_pedidos';        // nombre de la tabla real
    protected $primaryKey = 'detalle_pedido_id';  // llave primaria real

    public $timestamps = false; // tu tabla NO tiene created_at / updated_at

    protected $fillable = [
        'pedido_id',
        'producto_id',
        'cantidad',
        'precio',
        'ultima_actualizacion'
    ];

    // RELACIÓN: cada detalle pertenece a un pedido
    public function pedido()
    {
        return $this->belongsTo(Pedido::class, 'pedido_id', 'pedido_id');
    }

    // RELACIÓN: cada detalle pertenece a un producto
    public function producto()
    {
        return $this->belongsTo(Producto::class, 'producto_id', 'id');
    }
}
