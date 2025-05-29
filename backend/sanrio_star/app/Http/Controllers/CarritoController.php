<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CarritoController extends Controller
{
    public function agregar(Request $request)
    {
        $user = $request->user();
        $productoId = $request->input('producto_id');
        $cantidad = $request->input('cantidad', 1);

        // Aquí podrías guardar el producto en una tabla `carrito`
        return response()->json([
            'message' => 'Producto agregado al carrito con éxito.'
        ]);
    }
}
