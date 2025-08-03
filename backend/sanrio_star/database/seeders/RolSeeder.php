<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Verificar si ya existen roles
        $existingRoles = DB::table('roles')->count();
        
        if ($existingRoles === 0) {
            DB::table('roles')->insert([
                [
                    'rol_id' => 1,
                    'nombre_rol' => 'Usuario',
                    'descripcion' => 'Usuario regular del sistema',
                ],
                [
                    'rol_id' => 2,
                    'nombre_rol' => 'Administrador',
                    'descripcion' => 'Administrador del sistema',
                ],
            ]);
        }
    }
} 