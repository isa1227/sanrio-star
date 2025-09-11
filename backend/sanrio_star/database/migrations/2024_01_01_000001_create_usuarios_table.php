<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        if (!Schema::hasTable('usuarios')) {
            Schema::create('usuarios', function (Blueprint $table) {
                $table->id('usuario_id');
                $table->string('nombre_usuario', 100);
                $table->string('correo', 150)->unique();
                $table->string('contrasena');
                $table->unsignedBigInteger('rol_id');
                $table->timestamp('ultima_actualizacion')->nullable();
                
                $table->foreign('rol_id')->references('rol_id')->on('roles');
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('usuarios');
    }
}; 