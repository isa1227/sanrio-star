<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = DB::table('categorias_productos')
            ->select('categoria_id', 'nombre_categoria')
            ->orderBy('nombre_categoria')
            ->get();

        return response()->json($categorias);
    }
}
