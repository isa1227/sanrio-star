<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            // Si correo no es único, lo hacemos único
            $table->string('correo')->unique()->change();

            // Campo de verificación
            $table->timestamp('email_verified_at')->nullable()->after('correo');

            // Token para recordar sesión
            $table->rememberToken()->after('email_verified_at');
        });
    }

    public function down(): void
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn(['email_verified_at', 'remember_token']);
            // Ojo: no removemos unique de correo aquí para no romper otras migraciones
        });
    }
};
