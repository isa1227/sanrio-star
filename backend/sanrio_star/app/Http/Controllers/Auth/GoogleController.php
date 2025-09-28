<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Usuario;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Google\Client as GoogleClient;
use Illuminate\Support\Facades\DB;

class GoogleController extends Controller
{
    public function googleLogin(Request $request)
    {
        $request->validate(['token' => 'required|string']);
        $idToken = $request->input('token');

        $client = new GoogleClient(['client_id' => env('GOOGLE_CLIENT_ID')]);

        try {
            $payload = $client->verifyIdToken($idToken);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Token inválido', 'message' => $e->getMessage()], 401);
        }

        if (!$payload) {
            return response()->json(['error' => 'Token inválido'], 401);
        }

        DB::beginTransaction();
        try {
            $email    = $payload['email'] ?? null;
            $name     = $payload['name'] ?? ($payload['given_name'] ?? 'Usuario');
            $googleId = $payload['sub'] ?? null;
            $picture  = $payload['picture'] ?? null;

            $user = Usuario::where('google_id', $googleId)
                    ->orWhere('correo', $email)
                    ->first();

            if (!$user) {
                $user = Usuario::create([
                    'google_id'      => $googleId,
                    'nombre_usuario' => $name,
                    'correo'         => $email,
                    'contrasena'     => bcrypt(Str::random(24)),
                    'rol_id'         => 2,
                    'avatar'         => $picture,
                    'email_verified_at' => now(),
                ]);
            } else {
                $user->update([
                    'google_id' => $googleId,
                    'nombre_usuario' => $name,
                    'avatar' => $picture ?? $user->avatar,
                ]);
            }

            Auth::login($user);
            $token = $user->createToken('auth_token')->plainTextToken;

            DB::commit();

            return response()->json([
                'token' => $token,
                'user'  => $user->only(['usuario_id','nombre_usuario','correo','avatar']),
            ]);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Error al procesar login', 'message' => $e->getMessage()], 500);
        }
    }
}