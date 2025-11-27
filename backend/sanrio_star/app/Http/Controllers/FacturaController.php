<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FacturaController extends Controller
{
    public function store(Request $request)
    {
        try {
            \Log::info('Factura recibida:', $request->all());

            // Validación
            $request->validate([
                'usuario_id' => 'required|integer',
                'total' => 'required|numeric',
                'metodo_pago_id' => 'required|integer',
                'nombre' => 'required|string|max:255',
                'telefono' => 'required|string|max:20',
                'direccion' => 'required|string|max:255',
            ]);

            // Crear factura (SOLO CAMPOS QUE EXISTEN EN TU TABLA)
            $facturaId = DB::table('facturas')->insertGetId([
                'usuario_id' => $request->usuario_id,
                'fecha' => now(),
                'total' => $request->total,
                'metodo_pago_id' => $request->metodo_pago_id,
                'nombre' => $request->nombre,
                'telefono' => $request->telefono,
                'direccion' => $request->direccion,
            ]);

            \Log::info("Factura creada correctamente con ID: $facturaId");

            return response()->json([
                'message' => 'Factura guardada correctamente',
                'factura_id' => $facturaId  
            ], 201);

        } catch (\Illuminate\Database\QueryException $e) {
            \Log::error('Error en la base de datos: ' . $e->getMessage());
            return response()->json(['error' => 'Error en la base de datos'], 500);

        } catch (\Exception $e) {
            \Log::error('Error al crear factura: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}