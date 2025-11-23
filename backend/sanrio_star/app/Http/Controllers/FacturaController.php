<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class FacturaController extends Controller
{
    public function store(Request $request)
{
    \Log::info('Factura recibida:', $request->all());

    // Validar lo necesario
    $request->validate([
        'usuario_id' => 'required|integer',
        'total' => 'required|numeric',
        'metodo_pago_id' => 'required|integer',
    ]);

    // Crear factura
    $facturaId = DB::table('facturas')->insertGetId([
        'usuario_id' => $request->usuario_id, // 👈 SE USA EL ID QUE ENVÍA REACT
        'fecha' => now(),
        'total' => $request->total,
        'metodo_pago_id' => $request->metodo_pago_id
    ]);

    return response()->json([
        'message' => 'Factura guardada correctamente',
        'factura_id' => $facturaId  
    ], 201);
}

}