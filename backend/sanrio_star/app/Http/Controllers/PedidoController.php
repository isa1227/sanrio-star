<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\DetallePedido;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    // -------------------------------
    // Guardar un nuevo pedido
    // -------------------------------
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
                'estado'     => 'Pendiente', // asegúrate de que coincide con tus estados
                'metodo_pago_id' => $request->metodo_pago_id ?? null,
                'creado_en' => now(),
                'ultima_actualizacion' => now(),
            ]);

            // 2️⃣ Insertar los productos en detalle_pedidos
            foreach ($request->productos as $p) {
                DetallePedido::create([
                    'pedido_id'   => $pedido->pedido_id,
                    'producto_id' => $p['id'],
                    'cantidad'    => $p['cantidad'],
                    'precio'      => $p['precio'],
                ]);
            }

            DB::commit();

            return response()->json([
                'message'   => 'Pedido y productos guardados correctamente',
                'pedido_id' => $pedido->pedido_id,
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();

            return response()->json([
                'error'   => 'Error al crear el pedido',
                'message' => $e->getMessage(),
            ], 500);
        }
    }

    // -------------------------------
    // Traer los pedidos de un usuario
    // -------------------------------
    public function pedidosUsuario($usuarioId)
    {
        // Trae los pedidos del usuario con sus detalles y productos
        $pedidos = Pedido::with(['detalles.producto'])
            ->where('usuario_id', $usuarioId)
            ->orderBy('creado_en', 'desc')
            ->get();

        // Transformamos los detalles para que React los lea fácil
        $pedidos = $pedidos->map(function ($pedido) {
            return [
                'pedido_id'    => $pedido->pedido_id,
                'estado'       => $pedido->estado,
                'total'        => $pedido->total,
                'metodo_pago'  => $pedido->metodo_pago_id, // opcional: puedes mapear a texto
                'created_at'   => $pedido->creado_en,
                'productos'    => $pedido->detalles->map(function ($detalle) {
                    return [
                        'nombre'   => $detalle->producto->nombre,
                        'precio'   => $detalle->precio,
                        'cantidad' => $detalle->cantidad,
                        'imagen'   => $detalle->producto->imagen ?? null,
                    ];
                }),
            ];
        });

        return response()->json($pedidos);
    }
}
