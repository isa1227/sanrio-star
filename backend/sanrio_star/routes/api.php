<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\DB;

use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\AuthController;

Route::get('/productos/buscar', [ProductoController::class, 'buscar']);

// Ruta de prueba
Route::get('/mensaje', function () {
    return response()->json(['mensaje' => 'Hola desde Laravel 🐷']);
});

// Obtener roles
Route::get('/roles', function () {
    return response()->json(DB::table('roles')->get());
});

// ✅ Autenticación
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']); // ← Ruta agregada

// ✅ CRUD de Usuarios
Route::get('/usuarios', [UsuarioController::class, 'index']);
Route::post('/usuarios', [UsuarioController::class, 'store']);
Route::get('/usuarios/{id}', [UsuarioController::class, 'show']);
Route::put('/usuarios/{id}', [UsuarioController::class, 'update']);
Route::delete('/usuarios/{id}', [UsuarioController::class, 'destroy']);

// ✅ CRUD de Productos
Route::get('/productos', [ProductoController::class, 'index']);
Route::post('/productos', [ProductoController::class, 'store']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::apiResource('productos', ProductoController::class);
Route::apiResource('usuarios', UsuarioController::class);


Route::get('/categorias', function () {
    return DB::table('categorias_productos')->get();
});

