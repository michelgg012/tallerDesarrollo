<?php
$servername = "localhost";  
$username = "root";         
$password = "";              
$dbname = "vivero";         

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos desde la solicitud
$fecha = $_POST['fecha'];
$humedad_suelo = $_POST['humedad_suelo'];
$temperatura = $_POST['temperatura'];

// Validar y escapar datos para prevenir inyecciones SQL
$fecha = $conn->real_escape_string($fecha);
$humedad_suelo = $conn->real_escape_string($humedad_suelo);
$temperatura = $conn->real_escape_string($temperatura);

// Preparar y ejecutar la consulta SQL
$sql = "INSERT INTO datos_simulados (fecha, humedad_suelo, temperatura) VALUES ('$fecha', $humedad_suelo, $temperatura)";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
