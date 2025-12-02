<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $primaryKey = 'pedido_id';
    public $incrementing = true;
    protected $keyType = 'int';

    public $timestamps = false;

    protected $fillable = [
        'usuario_id',
        'total',
        'estado'
    ];

    // Relación para los detalles del pedido
    public function detalles()
    {
        return $this->hasMany(DetallePedido::class, 'pedido_id', 'pedido_id');
    }

    // NUEVA RELACIÓN: Un pedido pertenece a un usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id', 'usuario_id');
    }
}