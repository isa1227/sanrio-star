<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\DetallePedido;
use App\Models\Usuario; // Importar el modelo de usuario
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
    // Traer los pedidos de un usuario (AHORA INCLUYE EL NOMBRE DEL COMPRADOR)
    // -------------------------------
    public function pedidosUsuario($usuarioId)
    {

        // Trae los pedidos del usuario con sus detalles, productos Y EL USUARIO QUE HIZO EL PEDIDO
        $pedidos = Pedido::with(['detalles.producto', 'usuario']) // <-- Añadimos 'usuario' aquí
            ->where('usuario_id', $usuarioId)
            ->orderBy('creado_en', 'desc')
            ->get();

        // Transformamos los detalles para que React los lea fácil
        $pedidos = $pedidos->map(function ($pedido) {
    return [
        'pedido_id'    => $pedido->pedido_id,
        'estado'       => $pedido->estado,
        'total'        => $pedido->total,
        'metodo_pago'  => $pedido->metodo_pago_id,
        'created_at'   => $pedido->creado_en,

        // 👇 Agregamos los datos del usuario
        'usuario' => [
            'nombre' => $pedido->usuario->nombre ?? null,
            'direccion' => $pedido->usuario->direccion ?? null,
        ],

        'productos'    => $pedido->detalles->map(function ($detalle) {
            return [

                'pedido_id'    => $pedido->pedido_id,
                'estado'       => $pedido->estado,
                'total'        => $pedido->total,
                'metodo_pago'  => $pedido->metodo_pago_id,
                'created_at'   => $pedido->creado_en,
                // AHORA INCLUIMOS LA INFO COMPLETA DEL USUARIO
                'usuario'      => [
                    'nombre' => $pedido->usuario->nombre ?? 'Usuario Desconocido',
                    'direccion' => $pedido->usuario->direccion ?? 'Sin Dirección', // Si tienes este campo
                ],
                'productos'    => $pedido->detalles->map(function ($detalle) {
                    return [
                        'nombre'    => $detalle->producto->nombre,
                        'precio'    => $detalle->precio,
                        'cantidad'  => $detalle->cantidad,
                        // El campo 'imagen' viene de la tabla productos
                        'imagen'    => $detalle->producto->imagen ?? null,
                    ];
                }),

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