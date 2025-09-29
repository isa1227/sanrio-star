<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // 📌 Listar todos los productos
    public function index()
    {
        $productos = DB::table('productos')->get();

        foreach ($productos as $producto) {
            if ($producto->url_imagen) {
                // ✅ Convertir a ruta accesible desde /storage
                $producto->url_imagen = asset('storage/' . $producto->url_imagen);
            } else {
                $producto->url_imagen = null;
            }
        }

        return response()->json($productos);
    }

    // 📌 Crear producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre_producto' => 'required|string|max:255',
            'descripcion'     => 'required|string',
            'precio'          => 'required|numeric',
            // ✅ tabla real
            'categoria_id'    => 'required|integer|exists:categorias_productos,categoria_id',
            'personajes'      => 'nullable|string',
            'url_imagen'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $nombreImagen = null;
        if ($request->hasFile('url_imagen')) {
            $imagen = $request->file('url_imagen');
            $nombreImagen = 'productos/' . time() . '_' . $imagen->getClientOriginalName();
            // ✅ Se guarda en storage/app/public/productos
            $imagen->storeAs('public', $nombreImagen);
        }

        DB::table('productos')->insert([
            'nombre_producto'      => $request->nombre_producto,
            'descripcion'          => $request->descripcion,
            'precio'               => $request->precio,
            'categoria_id'         => $request->categoria_id,
            'url_imagen'           => $nombreImagen,
            'personajes'           => $request->personajes,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto creado correctamente']);
    }

    // 📌 Actualizar producto
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_producto' => 'required|string|max:255',
            'descripcion'     => 'required|string',
            'precio'          => 'required|numeric',
            'categoria_id'    => 'required|integer|exists:categorias_productos,categoria_id',
            'personajes'      => 'nullable|string',
            'url_imagen'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $producto = DB::table('productos')->where('producto_id', $id)->first();
        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        $nombreImagen = $producto->url_imagen; // mantener imagen actual si no hay nueva
        if ($request->hasFile('url_imagen')) {
            // ✅ borrar imagen anterior
            if ($producto->url_imagen) {
                Storage::delete('public/' . $producto->url_imagen);
            }
            $imagen = $request->file('url_imagen');
            $nombreImagen = 'productos/' . time() . '_' . $imagen->getClientOriginalName();
            $imagen->storeAs('public', $nombreImagen);
        }

        DB::table('productos')->where('producto_id', $id)->update([
            'nombre_producto'      => $request->nombre_producto,
            'descripcion'          => $request->descripcion,
            'precio'               => $request->precio,
            'categoria_id'         => $request->categoria_id,
            'url_imagen'           => $nombreImagen,
            'personajes'           => $request->personajes,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto actualizado correctamente']);
    }

    // 📌 Eliminar producto
    public function destroy($id)
    {
        $producto = DB::table('productos')->where('producto_id', $id)->first();
        if ($producto && $producto->url_imagen) {
            // ✅ Eliminar archivo físico si existe
            Storage::delete('public/' . $producto->url_imagen);
        }

        DB::table('productos')->where('producto_id', $id)->delete();
        return response()->json(['mensaje' => 'Producto eliminado correctamente']);
    }
}
