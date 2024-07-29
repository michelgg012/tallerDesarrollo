// Datos simulados
let soilMoisture = 0;
let temperature = 0;
let humidity = 0;
let simulatedDate = new Date();

// Inicializar gráfico
const ctxDataChart = document.getElementById('dataChart').getContext('2d');

const dataChart = new Chart(ctxDataChart, {
    type: 'bar',
    data: {
        labels: ['Humedad del Suelo (%)', 'Temperatura (°C)', 'Humedad (%)'],
        datasets: [{
            label: 'Datos Simulados',
            data: [0, 0, 0],
            backgroundColor: ['#36A2EB', '#FFCE56', '#4BC0C0'],
            borderColor: '#fff',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: {
                    display: true,
                    text: 'Valores'
                }
            }
        },
        plugins: {
            legend: {
                display: true
            }
        }
    }
});

// Función para simular datos
function simulateData() {
    soilMoisture = Math.floor(Math.random() * 101); // Humedad del suelo entre 0 y 100%
    temperature = Math.floor(Math.random() * (30 - 15 + 1)) + 15; // Temperatura entre 15 y 30
    humidity = Math.floor(Math.random() * 101); // Humedad entre 0 y 100%

    // Actualizar el panel con los datos simulados
    let formattedDate = simulatedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('date').innerText = "Fecha: " + simulatedDate.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    document.getElementById('soil-moisture').innerText = "Humedad del Suelo: " + soilMoisture + "%";
    document.getElementById('temperature').innerText = "Temperatura: " + temperature + " °C";
    document.getElementById('humidity').innerText = "Humedad: " + humidity + "%";

    // Actualizar el gráfico de datos
    dataChart.data.datasets[0].data = [soilMoisture, temperature, humidity];
    dataChart.update();

    // Avanzar la fecha en un día
    simulatedDate.setDate(simulatedDate.getDate() + 1);
}

// Función para iniciar riego (simulado)
function startIrrigation() {
    alert("Iniciando riego...");
}

// Función para cargar datos
function loadData() {
    const fecha = simulatedDate.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const humedadSuelo = soilMoisture;
    const temp = temperature;
    const hum = humidity;

    fetch('insert_data.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `fecha=${encodeURIComponent(fecha)}&humedad_suelo=${humedadSuelo}&temperatura=${temp}&humedad=${hum}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mostrar mensaje de respuesta del servidor
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Asignar eventos a los botones
document.getElementById('simulate-btn').addEventListener('click', simulateData);
document.getElementById('irrigate-btn').addEventListener('click', startIrrigation);
document.getElementById('load-data-btn').addEventListener('click', loadData);
