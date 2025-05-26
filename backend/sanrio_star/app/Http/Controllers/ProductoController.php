<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = DB::table('productos')->get();
        return response()->json($productos);
    }

    public function show($id)
    {
        $producto = DB::table('productos')->find($id);

        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        return response()->json($producto);
    }

    public function store(Request $request)
    {
        $id = DB::table('productos')->insertGetId([
            'nombre_producto' => $request->nombre_producto,
            'descripcion'     => $request->descripcion,
            'precio'          => $request->precio,
            'categoria_id'    => $request->categoria_id,
            'cantidad_minima' => $request->cantidad_minima,
            'cantidad_maxima' => $request->cantidad_maxima,
            'url_imagen'      => $request->url_imagen,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto creado', 'id' => $id], 201);
    }

    public function update(Request $request, $id)
    {
        $actualizado = DB::table('productos')
            ->where('producto_id', $id)
            ->update([
                'nombre_producto' => $request->nombre_producto,
                'descripcion'     => $request->descripcion,
                'precio'          => $request->precio,
                'categoria_id'    => $request->categoria_id,
                'cantidad_minima' => $request->cantidad_minima,
                'cantidad_maxima' => $request->cantidad_maxima,
                'url_imagen'      => $request->url_imagen,
                'ultima_actualizacion' => now()
            ]);

        if ($actualizado) {
            return response()->json(['mensaje' => 'Producto actualizado']);
        } else {
            return response()->json(['mensaje' => 'Producto no encontrado o sin cambios'], 404);
        }
    }

    public function destroy($id)
    {
        $eliminado = DB::table('productos')->where('producto_id', $id)->delete();

        if ($eliminado) {
            return response()->json(['mensaje' => 'Producto eliminado']);
        } else {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }
    }
}
