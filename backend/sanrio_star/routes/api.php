<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Verified;

use App\Models\Usuario;

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Auth\GoogleController;

Route::get('/productos/destacados', [ProductoController::class, 'destacados']);

// -------------------------------
// Rutas de prueba
// -------------------------------
Route::get('/mensaje', function () {
    return response()->json(['mensaje' => 'Hola desde Laravel 🐷']);
});

// -------------------------------
// Autenticación
// -------------------------------
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);


// Filtro: productos por personaje
Route::get('/productos/personaje/{personaje}', [ProductoController::class, 'porPersonaje']);

// -------------------------------
// Roles y Categorías
// -------------------------------
Route::get('/roles', function () {
    return response()->json(DB::table('roles')->get());
});

Route::get('/categorias', function () {
    return response()->json(DB::table('categorias_productos')->get());
});

// -------------------------------
// Verificación de correo
// -------------------------------
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $usuario = Usuario::findOrFail($id);

    // Validar firma de la URL
    if (!URL::hasValidSignature($request)) {
        return response()->json(['message' => 'Enlace de verificación inválido'], 403);
    }

    // Si no está verificado, marcarlo como verificado
    if (!$usuario->hasVerifiedEmail()) {
        $usuario->markEmailAsVerified();
        event(new Verified($usuario));
    }

    // Redirigir al frontend (React)
    return redirect('http://localhost:5173/email-verified');
})->name('verification.verify');

// -------------------------------
// API Resources (opcional, pero evita repetir CRUDs)
// -------------------------------
Route::apiResource('productos', ProductoController::class);
Route::apiResource('usuarios', UsuarioController::class);

Route::post('/forgot-password', [AuthController::class, 'forgotPassword']);
Route::post('/reset-password', [AuthController::class, 'resetPassword']);

Route::get('/reset-password/{token}', function ($token) {
    return view('auth.reset-password', ['token' => $token]);
});


use App\Http\Controllers\GoogleTokenController;

Route::post('/auth/google', [GoogleController::class, 'googleLogin']);


use App\Http\Controllers\FacturaController;
Route::post('/facturas', [FacturaController::class, 'store']);

use App\Http\Controllers\MetodoPagoController;
Route::post('/metodos-pago', [MetodoPagoController::class, 'store'])->middleware('auth:sanctum');

use App\Http\Controllers\DetalleFacturaController;
Route::post('/facturas/detalle', [DetalleFacturaController::class, 'store']);

use App\Http\Controllers\PedidoController;
Route::post('/pedidos', [PedidoController::class, 'store']);

Route::get('/notificaciones', function () {
    return DB::table('pedidos')
        ->where('leido', 0)  // solo no leídas
        ->orderBy('id', 'desc')
        ->get();
});

Route::post('/notificaciones/leer/{id}', function ($id) {
    return DB::table('pedidos')->where('id', $id)->update(['leido' => 1]);
});

Route::get('pedidos/{usuarioId}', [PedidoController::class, 'pedidosUsuario']);
