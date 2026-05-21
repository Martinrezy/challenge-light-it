<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Registration Confirmation</title>
</head>
<body>
    <p>Hello {{ $patient->full_name }},</p>
    <p>Your patient registration has been received successfully.</p>
    <p>Registered email: {{ $patient->email }}</p>
    <p>Thank you.</p>
</body>
</html>
