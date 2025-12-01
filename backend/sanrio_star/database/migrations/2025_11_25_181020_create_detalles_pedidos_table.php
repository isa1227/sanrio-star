<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('detalles_pedidos', function (Blueprint $table) {
            $table->bigIncrements('detalle_pedido_id');

            $table->unsignedBigInteger('pedido_id');
            $table->unsignedBigInteger('producto_id');

            $table->integer('cantidad');
            $table->decimal('precio', 10, 2);

            $table->timestamp('ultima_actualizacion')->useCurrent();

            // Relaciones
            $table->foreign('pedido_id')
                ->references('pedido_id')
                ->on('pedidos')
                ->onDelete('cascade');

            $table->foreign('producto_id')
                ->references('id')
                ->on('productos')
                ->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('detalles_pedidos');
    }
};
