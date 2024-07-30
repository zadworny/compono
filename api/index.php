<?php
$backend_url = 'http://backend:8080';
$secret_key = getenv('SECRET_KEY');

// Authenticate with the backend service to get a token
function authenticate() {
    global $backend_url, $secret_key;
    $auth_url = "$backend_url/auth?key=$secret_key";
    $auth_response = file_get_contents($auth_url);
    return $auth_response;
}

// Fetch candidates from the backend service
function fetch_candidates($token, $offset = 0) {
    global $backend_url;
    $candidates_url = "$backend_url/?offset=$offset";
    $opts = [
        "http" => [
            "header" => "Authorization: Bearer $token"
        ]
    ];
    $context = stream_context_create($opts);
    $response = file_get_contents($candidates_url, false, $context);
    return $response;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $token = authenticate();
    if (!$token) {
        http_response_code(401);
        echo "Unauthorized";
        exit;
    }

    $offset = isset($_GET['offset']) ? intval($_GET['offset']) : 0;
    $candidates = fetch_candidates($token, $offset);
    header('Content-Type: application/xml');
    echo $candidates;
} else {
    http_response_code(405);
    echo "Method Not Allowed";
}
?>
