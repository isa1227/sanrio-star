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

                // Validar cada ítem del detalle
                if (!isset($d['producto_id'], $d['cantidad'], $d['precio'])) {
                    throw new \Exception("Falta información en un detalle");
                }

                // Tu tabla REAL es: detalles_facturas
                DB::table('detalles_facturas')->insert([
                    'factura_id'  => $request->factura_id,
                    'producto_id' => $d['producto_id'],
                    'cantidad'    => $d['cantidad'],
                    'precio'      => $d['precio'], // solo estas columnas existen
                ]);
            }

            return response()->json([
                'message' => 'Detalles guardados correctamente'
            ], 201);

        } catch (\Exception $e) {
            \Log::error('Error guardando detalles: ' . $e->getMessage());
            return response()->json(['error' => 'Error al guardar los detalles'], 500);
        }
    }
}
