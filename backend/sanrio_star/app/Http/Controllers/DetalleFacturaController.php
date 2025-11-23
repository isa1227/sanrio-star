<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DetalleFacturaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'factura_id' => 'required|integer',
            'detalles'   => 'required|array'
        ]);

        foreach ($request->detalles as $item) {

            // 1. Obtener el stock actual del producto
            $producto = DB::table('productos')
                ->where('producto_id', $item['producto_id'])
                ->first();

            if (!$producto) {
                return response()->json([
                    'error' => "El producto con ID {$item['producto_id']} no existe."
                ], 404);
            }

            // 2. Validar que hay suficiente stock
            if ($producto->stock < $item['cantidad']) {
                return response()->json([
                    'error' => "Stock insuficiente para el producto {$item['producto_id']}."
                ], 400);
            }

            // 3. Descontar stock
            DB::table('productos')
                ->where('producto_id', $item['producto_id'])
                ->decrement('stock', $item['cantidad']);

            // 4. Insertar detalle de factura
            DB::table('detalles_facturas')->insert([
                'factura_id'  => $request->factura_id,
                'producto_id' => $item['producto_id'],
                'cantidad'    => $item['cantidad'],
                'precio'      => $item['precio'],
                'subtotal'    => $item['precio'],
                'created_at'  => now(),
                'updated_at'  => now()
            ]);
        }

        return response()->json([
            'message' => 'Detalle de factura guardado correctamente y stock actualizado'
        ], 201);
    }
}
