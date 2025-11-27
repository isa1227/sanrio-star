<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\DetallePedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
public function store(Request $request)
{
    // Validación básica
    $request->validate([
        'usuario_id' => 'required|integer',
        'total'      => 'required|numeric',
        'productos'  => 'required|array|min:1',
    ]);

    DB::beginTransaction();

    try {
        // 1️⃣ Crear pedido
        $pedido = Pedido::create([
            'usuario_id' => $request->usuario_id,
            'total'      => $request->total,
            'estado'     => 'pendiente'
        ]);

        // 2️⃣ Insertar los productos en detalle_pedidos
        foreach ($request->productos as $p) {
            DetallePedido::create([
                'pedido_id'   => $pedido->pedido_id, // ←← AQUI EL ARREGLO
                'producto_id' => $p['id'],
                'cantidad'    => $p['cantidad'],
                'precio'      => $p['precio'],
            ]);
        }

        DB::commit();

        return response()->json([
            'message'   => 'Pedido y productos guardados correctamente',
            'pedido_id' => $pedido->pedido_id, // ←← Y AQUÍ TAMBIÉN
        ], 201);

    } catch (\Exception $e) {
        DB::rollBack();

        return response()->json([
            'error'   => 'Error al crear el pedido',
            'message' => $e->getMessage(),
        ], 500);
    }
}
}