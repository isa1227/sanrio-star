<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use App\Models\Usuario;

class GoogleTokenController extends Controller
{
    public function loginWithGoogle(Request $request)
    {
        $idToken = $request->input('credential'); // JWT que viene desde React

        // Validar contra Google
        $googleResponse = Http::get("https://oauth2.googleapis.com/tokeninfo", [
            'id_token' => $idToken,
        ]);

        if ($googleResponse->failed()) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        $googleUser = $googleResponse->json();

        // Buscar o crear usuario con tu tabla personalizada
        $usuario = Usuario::updateOrCreate(
            ['correo' => $googleUser['email']],
            [
                'nombre_usuario' => $googleUser['name'],
                'google_id' => $googleUser['sub'],
                'avatar' => $googleUser['picture'],
                'email_verified_at' => now(),
            ]
        );

        // Crear token Sanctum
        $token = $usuario->createToken('auth_token')->plainTextToken;

        return response()->json([
            'usuario' => $usuario,
            'access_token' => $token,
            'token_type' => 'Bearer',
        ]);
    }
}
