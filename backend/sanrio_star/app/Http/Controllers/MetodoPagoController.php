<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\MetodoPago; // Esto asume que tienes un modelo MetodoPago
use Illuminate\Support\Facades\Auth;

class MetodoPagoController extends Controller
{
    public function store(Request $request)
    {
        // Validar datos recibidos
        $request->validate([
            'nombre_metodo' => 'required|string|max:255',
        ]);

        // Crear método de pago vinculado al usuario logueado
        $metodo = MetodoPago::create([
            'usuario_id' => Auth::id(),            // toma el id del usuario logueado
            'nombre_metodo' => $request->nombre_metodo,
            'ultima_actualizacion' => now(),
        ]);

        return response()->json($metodo, 201);
    }
}
