<?php
/**
 * Lightweight Environment Variable Loader
 * Loads key-value pairs from .env into getenv(), $_ENV, and $_SERVER
 */

if (!function_exists('loadEnvFile')) {
    function loadEnvFile($filePath) {
        if (!file_exists($filePath) || !is_file($filePath)) {
            return false;
        }

        $content = @file_get_contents($filePath);
        if ($content === false) {
            return false;
        }

        // Strip UTF-8 BOM if present
        $content = preg_replace('/^\xEF\xBB\xBF/', '', $content);
        $lines = preg_split('/\r\n|\r|\n/', $content);

        foreach ($lines as $line) {
            $line = trim($line);

            // Skip comments and empty lines
            if ($line === '' || $line[0] === '#') {
                continue;
            }

            // Must contain an '=' separator
            $equalPos = strpos($line, '=');
            if ($equalPos === false) {
                continue;
            }

            $key = trim(substr($line, 0, $equalPos));
            $val = trim(substr($line, $equalPos + 1));

            // Validate key name
            if ($key === '') {
                continue;
            }

            // Strip enclosing quotes if present
            $len = strlen($val);
            if ($len >= 2) {
                $first = $val[0];
                $last = $val[$len - 1];
                if (($first === '"' && $last === '"') || ($first === "'" && $last === "'")) {
                    $val = substr($val, 1, -1);
                }
            }

            // Populate environment
            putenv("{$key}={$val}");
            $_ENV[$key] = $val;
            $_SERVER[$key] = $val;
        }

        return true;
    }
}

// Automatically search and load .env from backend directory or project root
(function () {
    $candidates = [
        dirname(__DIR__) . '/.env',
        dirname(__DIR__, 2) . '/.env',
    ];

    foreach ($candidates as $file) {
        if (file_exists($file) && is_file($file)) {
            loadEnvFile($file);
            break;
        }
    }
})();
