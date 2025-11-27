<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    public function store(Request $request)
    {
        // Validación mínima
        $request->validate([
            'usuario_id' => 'required|integer',
            'total'      => 'required|numeric'
        ]);

        // Creación del pedido
        $pedido = Pedido::create([
            'usuario_id' => $request->usuario_id,
            'total' => $request->total,
            'estado' => 'pendiente'
        ]);

        return response()->json([
            'message' => 'Pedido creado correctamente',
            'pedido' => $pedido
        ], 201);
    }
}
