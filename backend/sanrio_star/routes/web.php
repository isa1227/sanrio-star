<?php

use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/api/mensaje', function () {
    return response()->json(['mensaje' => 'Hola desde Laravel 🦄']);
});
