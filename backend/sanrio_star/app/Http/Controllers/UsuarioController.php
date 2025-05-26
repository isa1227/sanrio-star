<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::all();
    }

    public function store(Request $request)
{
    $validatedData = $request->validate([
        'nombre_usuario' => 'required|string|max:255',
        'correo' => 'required|email|unique:usuarios',
        'contrasena' => 'required|string|min:6',
        'rol_id' => 'required|exists:roles,id_de_rol',
        // añade otros campos si los necesitas
    ]);

    // Encriptar la contraseña si es necesario
    $validatedData['contrasena'] = bcrypt($validatedData['contrasena']);

    $usuario = Usuario::create($validatedData);
    return response()->json($usuario, 201);
}


    public function show($id)
    {
        return Usuario::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->update($request->all());
        return response()->json($usuario);
    }

    public function destroy($id)
    {
        Usuario::destroy($id);
        return response()->json(null, 204);
    }
}
