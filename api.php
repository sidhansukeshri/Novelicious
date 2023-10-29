<?php
$host = "localhost";
$port = "5432";
$dbname = "mybookstore";
$db_username = "postgres";
$db_password = "Spysid@#69";

try {
    // Create a new PDO instance
    $pdo = new PDO("pgsql:host=$host;port=$port;dbname=$dbname;user=$db_username;password=$db_password");

    // Set PDO to throw exceptions on error
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Fetch data from the "books" table
    $stmt = $pdo->query('SELECT * FROM books');
    
    // Check if the query was executed successfully
    if ($stmt) {
        // Fetch all rows as an associative array
        $books = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        // Output the data as JSON
        header('Content-Type: application/json');
        echo json_encode($books);
    } 
    else {
        // If there was an error executing the query, return an error message
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array("error" => "Failed to retrieve book data."));
    }
} catch (PDOException $e) {
    // If there was a database connection error, return an error message
    header("HTTP/1.1 500 Internal Server Error");
    echo json_encode(array("error" => "Failed to connect to the database: " . $e->getMessage()));
}
?>
