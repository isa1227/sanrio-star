<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Pedido;

class PedidoController extends Controller
{
    public function index()
    {
        return Pedido::all();
    }

    public function store(Request $request)
    {
        $pedido = Pedido::create($request->all());
        return response()->json($pedido, 201);
    }

    public function show($id)
    {
        return Pedido::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $pedido = Pedido::findOrFail($id);
        $pedido->update($request->all());
        return response()->json($pedido);
    }

    public function destroy($id)
    {
        Pedido::destroy($id);
        return response()->json(null, 204);
    }
}
