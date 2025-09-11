<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\RolController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriaController;

Route::get('/productos', [ProductoController::class, 'index']);
Route::get('/productos/{id}', [ProductoController::class, 'show']);
Route::post('/productos', [ProductoController::class, 'store']);
// Permitimos POST con _method=PUT (form-data) y PUT directo
Route::post('/productos/{id}', [ProductoController::class, 'update']);
Route::put('/productos/{id}', [ProductoController::class, 'update']);
Route::delete('/productos/{id}', [ProductoController::class, 'destroy']);

Route::get('/categorias', [CategoriaController::class, 'index']);

Route::get('/mensaje', fn() => response()->json(['mensaje' => 'Hola desde Laravel 🐷']));


// Usuarios (si los usas)
Route::apiResource('usuarios', UsuarioController::class);

// Roles
Route::get('/roles', [RolController::class, 'index']);

// Autenticación (si aplica)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
