<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Usuario;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_usuario' => 'required|string|max:100',
            'correo' => 'required|string|email|max:150|unique:usuarios',
            'contrasena' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

       $usuario = Usuario::create([
    'nombre_usuario' => $request->nombre_usuario,
    'correo' => $request->correo,
    'contrasena' => Hash::make($request->contrasena),
    'rol_id' => 1, 
]);


        return response()->json([
            'mensaje' => 'Usuario registrado correctamente',
            'usuario' => $usuario
        ], 201);
    }

    public function login(Request $request)
{
    $validator = Validator::make($request->all(), [
        'correo' => 'required|string|email',
        'contrasena' => 'required|string',
    ]);

    if ($validator->fails()) {
        return response()->json(['error' => 'Datos inválidos'], 400);
    }

    $usuario = Usuario::join('roles', 'usuarios.rol_id', '=', 'roles.rol_id')
        ->where('correo', $request->correo)
        ->select('usuarios.*', 'roles.nombre_rol')
        ->first();

    if (!$usuario || !Hash::check($request->contrasena, $usuario->contrasena)) {
        return response()->json(['error' => 'Credenciales incorrectas'], 401);
    }

    return response()->json([
        'mensaje' => 'Inicio de sesión exitoso',
        'usuario' => $usuario
    ]);
}

}
