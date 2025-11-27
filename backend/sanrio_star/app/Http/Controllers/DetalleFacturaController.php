<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DetalleFacturaController extends Controller
{
    public function store(Request $request)
{
    try {
        \Log::info('Detalles recibidos:', $request->all());

        // Validación general
        $request->validate([
            'factura_id' => 'required|integer',
            'detalles'   => 'required|array|min:1'
        ]);

        foreach ($request->detalles as $d) {

            // Validar cada ítem
            if (!isset($d['producto_id'], $d['cantidad'], $d['precio'])) {
                throw new \Exception("Falta información en un detalle");
            }

            // OBTENER STOCK DEL PRODUCTO
            $producto = DB::table('productos')
                ->where('producto_id', $d['producto_id'])
                ->first();

            if (!$producto) {
                throw new \Exception("El producto {$d['producto_id']} no existe");
            }

            // VALIDAR STOCK SUFICIENTE
            if ($producto->stock < $d['cantidad']) {
                throw new \Exception("No hay stock suficiente para el producto: {$producto->nombre_producto}");
            }

            // DESCONTAR STOCK
            DB::table('productos')
                ->where('producto_id', $d['producto_id'])
                ->update([
                    'stock' => $producto->stock - $d['cantidad'],
                    'ultima_actualizacion' => now()
                ]);

            // GUARDAR DETALLE EN TU TABLA REAL: detalles_facturas
            DB::table('detalles_facturas')->insert([
                'factura_id'  => $request->factura_id,
                'producto_id' => $d['producto_id'],
                'cantidad'    => $d['cantidad'],
                'precio'      => $d['precio'],
            ]);
        }

        return response()->json([
            'message' => 'Detalles guardados correctamente y stock actualizado'
        ], 201);

    } catch (\Exception $e) {
        \Log::error('Error guardando detalles: ' . $e->getMessage());
        return response()->json(['error' => $e->getMessage()], 500);
    }
}

}