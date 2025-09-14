<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Hash;

class UsuarioController extends Controller
{
    public function index()
    {
        return Usuario::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nombre_usuario' => 'required|string|max:255',
            'correo' => 'required|email|unique:usuarios',
            'contrasena' => 'required|string|min:6',
            'rol_id' => 'required|integer',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $usuario = new Usuario();
        $usuario->nombre_usuario = $request->nombre;
        $usuario->correp = $request->email;
        $usuario->contrasena = Hash::make($request->password);
        $usuario->rol_id = $request->rol_id;

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = time().'_'.$file->getClientOriginalName();
            $file->move(public_path('uploads/usuarios'), $filename);
            $usuario->imagen = 'uploads/usuarios/'.$filename;
        }

        $usuario->save();
        return response()->json($usuario, 201);
    }

    public function show($usuario_id)
    {
        return Usuario::findOrFail($usuario_id);
    }

    public function update(Request $request, $usuario_id)
    {
        $usuario = Usuario::findOrFail($usuario_id);

       $usuario->nombre_usuario = $request->input('nombre_usuario', $usuario->nombre_usuario);
        $usuario->correo = $request->input('correo', $usuario->correo);

        if ($request->filled('contrasena')) {
            $usuario->contrasena = Hash::make($request->contrasena);
        }

        if ($request->hasFile('imagen')) {
            $file = $request->file('imagen');
            $filename = time().'_'.$file->getClientOriginalName();
            $file->move(public_path('uploads/usuarios'), $filename);
            $usuario->imagen = 'uploads/usuarios/'.$filename;
        }

        $usuario->rol_id = $request->rol_id ?? $usuario->rol_id;

        $usuario->save();
        return response()->json($usuario);
    }

    public function destroy($usuario_id)
    {
        $usuario = Usuario::findOrFail($usuario_id);
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }
}
