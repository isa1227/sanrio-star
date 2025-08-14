<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{

    public function buscar(Request $request)
{
    $q = $request->query('q', '');

    $productos = \App\Models\Producto::where('nombre', 'LIKE', "%$q%")
        ->orWhere('descripcion', 'LIKE', "%$q%")
        ->get();

    return response()->json($productos);
}

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
        $request->validate([
            'nombre_producto' => 'required|string',
            'descripcion'     => 'required|string',
            'precio'          => 'required|numeric',
            'categoria_id'    => 'required|integer',
            'imagen'          => 'required|image|max:2048',
        ]);

        // Guardar imagen en storage/app/public/productos
        $rutaImagen = $request->file('imagen')->store('productos', 'public');

        $id = DB::table('productos')->insertGetId([
            'nombre_producto' => $request->nombre_producto,
            'descripcion'     => $request->descripcion,
            'precio'          => $request->precio,
            'categoria_id'    => $request->categoria_id,
            'url_imagen'      => $rutaImagen,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto creado', 'id' => $id, 'url_imagen' => $rutaImagen], 201);
    }

    public function update(Request $request, $id)
    {
        $producto = DB::table('productos')->where('producto_id', $id)->first();

        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        $rutaImagen = $producto->url_imagen;

        // Si hay nueva imagen, eliminar la anterior y guardar la nueva
        if ($request->hasFile('imagen')) {
            if (Storage::disk('public')->exists($rutaImagen)) {
                Storage::disk('public')->delete($rutaImagen);
            }

            $rutaImagen = $request->file('imagen')->store('productos', 'public');
        }

        $actualizado = DB::table('productos')
            ->where('producto_id', $id)
            ->update([
                'nombre_producto' => $request->nombre_producto,
                'descripcion'     => $request->descripcion,
                'precio'          => $request->precio,
                'categoria_id'    => $request->categoria_id,
                'url_imagen'      => $rutaImagen,
                'ultima_actualizacion' => now()
            ]);

        return response()->json(['mensaje' => 'Producto actualizado']);
    }

    public function destroy($id)
    {
        $producto = DB::table('productos')->where('producto_id', $id)->first();

        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        if ($producto->url_imagen && Storage::disk('public')->exists($producto->url_imagen)) {
            Storage::disk('public')->delete($producto->url_imagen);
        }

        DB::table('productos')->where('producto_id', $id)->delete();

        return response()->json(['mensaje' => 'Producto eliminado']);
    }
}
