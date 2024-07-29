<?php
$servername = "localhost"; // Cambia si tu servidor es diferente
$username = "root";         // Reemplaza con tu usuario de MySQL
$password = "";             // Reemplaza con tu contraseña de MySQL (deja vacío si no hay contraseña)
$dbname = "vivero";        // Nombre de la base de datos que creaste

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener datos desde la solicitud (asegúrate de que estos nombres coincidan con los que envías desde tu JavaScript)
$fecha = $_POST['fecha'];
$humedad_suelo = $_POST['humedad_suelo'];
$temperatura = $_POST['temperatura'];
$humedad = $_POST['humedad'];

// Validar y escapar datos para prevenir inyecciones SQL
$fecha = $conn->real_escape_string($fecha);
$humedad_suelo = $conn->real_escape_string($humedad_suelo);
$temperatura = $conn->real_escape_string($temperatura);
$humedad = $conn->real_escape_string($humedad);

// Preparar y ejecutar la consulta SQL
$sql = "INSERT INTO datos_simulados (fecha, humedad_suelo, temperatura, humedad) VALUES ('$fecha', $humedad_suelo, $temperatura, $humedad)";

if ($conn->query($sql) === TRUE) {
    echo "Datos insertados correctamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
