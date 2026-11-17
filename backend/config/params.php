<?php

require_once __DIR__ . '/dotenv.php';

return [
    'adminEmail' => getenv('ADMIN_EMAIL') ?: 'admin@admissionodisha.com', 
    'senderEmail' => getenv('SENDER_EMAIL') ?: 'noreply@admissionodisha.com', 
    'senderName' => getenv('SENDER_NAME') ?: 'Admission Odisha',

    // Security & CORS configuration
    'allowedOrigins' => [
        'https://admissionodisha.com',
        'https://www.admissionodisha.com',
        'http://admissionodisha.com',
        'http://www.admissionodisha.com',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:3000',
        'http://localhost:4173',
    ],
    // Session token validity in seconds (14 days sliding window)
    'tokenLifetime' => 7 * 24 * 60 * 60,
];

