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
            'nombre' => 'required|string|max:255',
            'email' => 'required|email|unique:usuarios',
            'password' => 'required|string|min:6',
            'rol_id' => 'required|integer',
            'imagen' => 'nullable|image|mimes:jpg,jpeg,png|max:2048'
        ]);

        $usuario = new Usuario();
        $usuario->nombre = $request->nombre;
        $usuario->email = $request->email;
        $usuario->password = Hash::make($request->password);
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

    public function show($id)
    {
        return Usuario::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $usuario = Usuario::findOrFail($id);

        $usuario->nombre = $request->nombre ?? $usuario->nombre;
        $usuario->email = $request->email ?? $usuario->email;

        if ($request->filled('password')) {
            $usuario->password = Hash::make($request->password);
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

    public function destroy($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();
        return response()->json(['message' => 'Usuario eliminado']);
    }
}
