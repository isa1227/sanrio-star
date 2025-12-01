<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Models\Usuario;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;


class AuthController extends Controller
{
    /**
     * Registro de usuario con envío de correo de verificación
     */
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre_usuario' => 'required|string|max:100',
            'correo' => 'required|string|email|max:150|unique:usuarios,correo',
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
            'ultima_actualizacion' => now(),
        ]);

        // 📩 Enviar correo de verificación
        $usuario->sendEmailVerificationNotification();

        return response()->json([
            'mensaje' => 'Usuario registrado correctamente. Revisa tu correo para verificar la cuenta 📩',
            'usuario' => $usuario
        ], 201);
    }


    /**
     * Login con validación de correo verificado
     */
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'correo' => 'required|string|email',
            'contrasena' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 422);
        }

        // Buscar usuario por correo
        $usuario = Usuario::where('correo', $request->correo)->first();

        if (!$usuario) {
            return response()->json([
                'error' => 'El usuario no existe'
            ], 404);
        }

        // Comparar contraseña
        if (!Hash::check($request->contrasena, $usuario->contrasena)) {
            return response()->json([
                'error' => 'Contraseña incorrecta'
            ], 401);
        }

        // 🔒 Verificar correo
        if (is_null($usuario->email_verified_at)) {
            return response()->json([
                'error' => 'Debes verificar tu correo antes de iniciar sesión'
            ], 403);
        }

        // Obtener rol
        $rol = DB::table('roles')
            ->where('rol_id', $usuario->rol_id)
            ->value('nombre_rol');

        return response()->json([
            'mensaje' => 'Inicio de sesión exitoso ✅',
            'usuario' => [
                'usuario_id' => $usuario->usuario_id,
                'nombre_usuario' => $usuario->nombre_usuario,
                'correo' => $usuario->correo,
                'rol_id' => $usuario->rol_id,
                'rol' => $rol,
            ]
        ], 200);
    }

    public function forgotPassword(Request $request)
    {
        $request->validate([
            'correo' => 'required|email|exists:usuarios,correo',
        ]);

        $token = Str::random(60);

        DB::table('password_reset_tokens')->updateOrInsert(
            ['email' => $request->correo],
            ['token' => $token, 'created_at' => now()]
        );

        // 📩 Enviar correo con link
        // ✅ Esto apunta a tu frontend React
        $resetUrl = "http://localhost:5173/reset-password/{$token}";
        Mail::raw("Haz clic aquí para restablecer tu contraseña: $resetUrl", function ($message) use ($request) {
            $message->to($request->correo)
                ->subject('Recuperar contraseña');
        });

        return response()->json(['mensaje' => 'Te hemos enviado un enlace para recuperar tu contraseña 📩']);
    }

    // 🚀 Resetear la contraseña
    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'contrasena' => 'required|min:6',
        ]);

        $reset = DB::table('password_reset_tokens')->where('token', $request->token)->first();

        if (!$reset) {
            return response()->json(['error' => 'Token inválido o expirado'], 400);
        }

        $usuario = Usuario::where('correo', $reset->email)->first();
        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $usuario->contrasena = Hash::make($request->contrasena);
        $usuario->ultima_actualizacion = now();
        $usuario->save();

        // Borrar token usado
        DB::table('password_reset_tokens')->where('email', $reset->email)->delete();

        return response()->json(['mensaje' => 'Contraseña actualizada correctamente ✅']);
    }
}

