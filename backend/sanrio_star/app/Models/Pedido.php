<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    public $timestamps = false; // ← FIX IMPORTANTE

    protected $fillable = [
        'usuario_id',
        'total',
        'estado'
    ];

    // Relación correcta
    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'pedido_id', 'id');
    }
}
