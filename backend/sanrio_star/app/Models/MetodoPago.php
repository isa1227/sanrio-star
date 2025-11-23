<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MetodoPago extends Model
{
    use HasFactory;

    protected $table = 'metodos_pago';

    protected $primaryKey = 'metodo_pago_id'; // si tu id no se llama "id"

    public $timestamps = false; // porque ya tienes 'ultima_actualizacion'

    protected $fillable = [
        'usuario_id',
        'nombre_metodo',
        'ultima_actualizacion'
    ];
}
