<?php

return [

    'paths' => ['api/*', 'sanctum/csrf-cookie', 'auth/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => [
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        env('FRONTEND_URL'),
    ],

    'allowed_origins_patterns' => [
        // allow the railway.app frontend (http or https, optional port)
        //'^https?://react-frontend-production-2ec7\.up\.railway\.app(:[0-9]+)?$',
    ],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => true,

];