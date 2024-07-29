// Función para cargar datos de la base de datos
function loadRealTimeData() {
    fetch('get_data.php')
        .then(response => response.json())
        .then(data => {
            if (data) {
                // Actualizar el panel con los datos recibidos
                document.getElementById('date').innerText = "Fecha: " + new Date(data.fecha).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                });
                document.getElementById('soil-moisture').innerText = "Humedad del Suelo: " + data.humedad_suelo + "%";
                document.getElementById('temperature').innerText = "Temperatura: " + data.temperatura + " °C";
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Llamar a la función de carga de datos cada 10 segundos
setInterval(loadRealTimeData, 10000); // 10000 ms = 10 segundos
