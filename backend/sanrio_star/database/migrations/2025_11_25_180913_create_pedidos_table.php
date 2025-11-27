<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pedidos', function (Blueprint $table) {
    $table->id();
    $table->unsignedBigInteger('usuario_id');
    $table->integer('total');
    $table->string('estado')->default('pendiente'); // opcional
    $table->timestamps();
});
    }
    
    public function down(): void
    {
        Schema::dropIfExists('pedidos');
    }
};
