<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class ProductoController extends Controller
{
    // 📦 Listar todos los productos
    public function index()
    {
        $productos = DB::table('productos')->get();

        foreach ($productos as $producto) {
            $producto->url_imagen = $producto->url_imagen
                ? asset('storage/' . $producto->url_imagen)
                : null;
        }

        return response()->json($productos);
    }

    // 🌟 Obtener los 4 productos más recientes (sin importar personaje o categoría)
    public function destacados()
    {
        try {
            // 🔹 Toma los últimos 4 registros agregados
            $productos = DB::table('productos')
                ->orderBy('producto_id', 'desc') // puedes usar 'created_at' si lo tienes
                ->limit(4)
                ->get();

            foreach ($productos as $producto) {
                $producto->url_imagen = $producto->url_imagen
                    ? asset('storage/' . $producto->url_imagen)
                    : null;
            }

            return response()->json($productos);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener productos destacados',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    // 🎭 Filtrar productos por personaje
    public function porPersonaje($personaje)
    {
        try {
            $productos = DB::table('productos')
                ->whereRaw('LOWER(personajes) = ?', [strtolower($personaje)])
                ->get();

            foreach ($productos as $producto) {
                $producto->url_imagen = $producto->url_imagen
                    ? asset('storage/' . $producto->url_imagen)
                    : null;
            }

            if ($productos->isEmpty()) {
                return response()->json(['mensaje' => 'No se encontraron productos para ' . $personaje], 404);
            }

            return response()->json($productos);
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Error al obtener productos por personaje',
                'detalle' => $e->getMessage()
            ], 500);
        }
    }

    // 🆕 Crear producto
    public function store(Request $request)
    {
        $request->validate([
            'nombre_producto' => 'required|string|max:255',
            'descripcion'     => 'required|string',
            'precio'          => 'required|numeric',
            'stock'           => 'required|integer|min:0',
            'categoria_id'    => 'required|integer|exists:categorias_productos,categoria_id',
            'personajes'      => 'nullable|string',
            'url_imagen'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $nombreImagen = null;
        if ($request->hasFile('url_imagen')) {
            $imagen = $request->file('url_imagen');
            $nombreImagen = 'productos/' . time() . '_' . $imagen->getClientOriginalName();
            $imagen->storeAs('public', $nombreImagen);
        }

        DB::table('productos')->insert([
            'nombre_producto'      => $request->nombre_producto,
            'descripcion'          => $request->descripcion,
            'precio'               => $request->precio,
            'stock'                => $request->stock,
            'categoria_id'         => $request->categoria_id,
            'url_imagen'           => $nombreImagen,
            'personajes'           => $request->personajes,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto creado correctamente']);
    }

    // ✏️ Actualizar producto
    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre_producto' => 'required|string|max:255',
            'descripcion'     => 'required|string',
            'precio'          => 'required|numeric',
            'stock'           => 'required|integer|min:0',
            'categoria_id'    => 'required|integer|exists:categorias_productos,categoria_id',
            'personajes'      => 'nullable|string',
            'url_imagen'      => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048'
        ]);

        $producto = DB::table('productos')->where('producto_id', $id)->first();
        if (!$producto) {
            return response()->json(['mensaje' => 'Producto no encontrado'], 404);
        }

        $nombreImagen = $producto->url_imagen;
        if ($request->hasFile('url_imagen')) {
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
            'stock'                => $request->stock,
            'categoria_id'         => $request->categoria_id,
            'url_imagen'           => $nombreImagen,
            'personajes'           => $request->personajes,
            'ultima_actualizacion' => now()
        ]);

        return response()->json(['mensaje' => 'Producto actualizado correctamente']);
    }

    // 🗑️ Eliminar producto
    public function destroy($id)
    {
        $producto = DB::table('productos')->where('producto_id', $id)->first();
        if ($producto && $producto->url_imagen) {
            Storage::delete('public/' . $producto->url_imagen);
        }

        DB::table('productos')->where('producto_id', $id)->delete();
        return response()->json(['mensaje' => 'Producto eliminado correctamente']);
    }
}
