<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 0); // Don't display errors to user
ini_set('log_errors', 1);

// Start output buffering to catch any unexpected output
ob_start();

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Function to send JSON response and exit
function sendJsonResponse($data, $httpCode = 200) {
    http_response_code($httpCode);
    echo json_encode($data);
    exit;
}

// Check if request method is POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendJsonResponse(['error' => 'Method not allowed'], 405);
}

// Get form data
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validate required fields
$errors = [];
if (empty($name)) {
    $errors[] = 'Name is required';
}
if (empty($email)) {
    $errors[] = 'Email is required';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Invalid email format';
}
if (empty($subject)) {
    $errors[] = 'Subject is required';
}
if (empty($message)) {
    $errors[] = 'Message is required';
}

// If there are validation errors, return them
if (!empty($errors)) {
    sendJsonResponse(['error' => 'Validation failed', 'details' => $errors], 400);
}

// Email configuration
$to = 'hello@adilbayraktar.com'; // Primary email address
$cc = 'adilbayraktar1997@gmail.com'; // Secondary email address (CC)
$from = $email;
$replyTo = $email;

// Alternative: Send to both emails separately (uncomment if CC doesn't work)
// $emails = ['hello@adilbayraktar.com', 'adilbayraktar1997@gmail.com'];

// Email headers
$headers = [
    'From: ' . $name . ' <' . $from . '>',
    'Reply-To: ' . $replyTo,
    'Cc: ' . $cc,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/html; charset=UTF-8'
];

// Email body
$emailBody = "
<html>
<head>
    <title>New Contact Form Submission</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #f59e0b; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #f59e0b; }
        .value { margin-top: 5px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>New Contact Form Submission</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>Name:</div>
                <div class='value'>" . htmlspecialchars($name) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Email:</div>
                <div class='value'>" . htmlspecialchars($email) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Subject:</div>
                <div class='value'>" . htmlspecialchars($subject) . "</div>
            </div>
            <div class='field'>
                <div class='label'>Message:</div>
                <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
            </div>
        </div>
        <div class='footer'>
            <p>This email was sent from your portfolio contact form.</p>
            <p>Sent on: " . date('Y-m-d H:i:s') . "</p>
        </div>
    </div>
</body>
</html>
";

// Send email
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

// Alternative: Send to both emails separately (if CC doesn't work)
// Uncomment the following lines and comment the above line if needed:
/*
$mailSent1 = mail('hello@adilbayraktar.com', $subject, $emailBody, implode("\r\n", $headers));
$mailSent2 = mail('adilbayraktar1997@gmail.com', $subject, $emailBody, implode("\r\n", $headers));
$mailSent = $mailSent1 && $mailSent2;
*/

if ($mailSent) {
    // Log successful submission
    $logEntry = date('Y-m-d H:i:s') . " - Email sent successfully from: " . $email . " (" . $name . ") to: " . $to . " (CC: " . $cc . ")\n";
    file_put_contents('email-log.txt', $logEntry, FILE_APPEND | LOCK_EX);
    
    sendJsonResponse([
        'success' => true,
        'message' => 'Email sent successfully to both addresses!'
    ]);
} else {
    // Log failed submission
    $logEntry = date('Y-m-d H:i:s') . " - Email failed to send from: " . $email . " (" . $name . ")\n";
    file_put_contents('email-log.txt', $logEntry, FILE_APPEND | LOCK_EX);
    
    sendJsonResponse([
        'success' => false,
        'error' => 'Failed to send email',
        'message' => 'There was an error sending your message. Please try again.'
    ], 500);
}

// This should never be reached due to exit() in sendJsonResponse
// But just in case, clean any unexpected output
$output = ob_get_clean();
if (!empty($output)) {
    // Log unexpected output
    error_log("Unexpected output in send-email.php: " . $output);
    sendJsonResponse([
        'success' => false,
        'error' => 'Unexpected server output',
        'message' => 'There was an unexpected error. Please try again.'
    ], 500);
}

// Fallback response (should never reach here)
sendJsonResponse([
    'success' => false,
    'error' => 'Unknown error',
    'message' => 'An unknown error occurred. Please try again.'
], 500);
?>
