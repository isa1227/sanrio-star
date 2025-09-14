<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Auth\MustVerifyEmail as MustVerifyEmailTrait;

class Usuario extends Authenticatable implements MustVerifyEmail
{
    use HasApiTokens, Notifiable, MustVerifyEmailTrait;

    protected $table = 'usuarios';
    protected $primaryKey = 'usuario_id';   // 👈 tu PK personalizada
    public $incrementing = true;
    protected $keyType = 'int';

    protected $fillable = [
        'nombre_usuario',
        'correo',
        'contrasena',
        'rol_id',
        'direccion_envio',
        'direccion_facturacion',
        'ultima_actualizacion',
        'email_verified_at',
        'remember_token',
    ];

    public $timestamps = false;

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // 👉 Sobrescribir para que use 'correo' en lugar de 'email'
    public function getAuthIdentifierName()
    {
        return 'correo';
    }

    public function getAuthPassword()
    {
        return $this->contrasena;
    }

    // Para verificación de correo
    public function getEmailForVerification()
    {
        return $this->correo;
    }

    public function routeNotificationForMail()
    {
        return $this->correo;
    }
}