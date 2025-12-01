<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\JsonResponse;
use Carbon\Carbon;

class CategoriaController extends Controller
{
    // Lista todas las categorias
    public function index(): JsonResponse
    {
        $categorias = Categoria::select('categoria_id', 'nombre_categoria', 'descripcion', 'ultima_actualizacion')
            ->orderBy('nombre_categoria')
            ->get();

        return response()->json($categorias, 200);
    }

    // Muestra una categoria por id
    public function show($id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        return response()->json($categoria, 200);
    }

    // Crear categoria
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre_categoria' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['ultima_actualizacion'] = Carbon::now()->toDateTimeString();

        $categoria = Categoria::create($data);

        return response()->json(['message' => 'Categoría creada', 'categoria' => $categoria], 201);
    }

    // Actualizar categoria
    public function update(Request $request, $id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre_categoria' => 'required|string|max:255',
            'descripcion' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $data = $validator->validated();
        $data['ultima_actualizacion'] = Carbon::now()->toDateTimeString();

        $categoria->update($data);

        return response()->json(['message' => 'Categoría actualizada', 'categoria' => $categoria], 200);
    }

    // Eliminar categoria
    public function destroy($id): JsonResponse
    {
        $categoria = Categoria::find($id);

        if (! $categoria) {
            return response()->json(['message' => 'Categoría no encontrada.'], 404);
        }

        $categoria->delete();

        return response()->json(['message' => 'Categoría eliminada'], 200);
    }
}
