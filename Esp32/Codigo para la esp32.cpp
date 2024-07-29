#include <WiFi.h>
#include <HTTPClient.h>

// Reemplaza con tus credenciales Wi-Fi
const char* ssid = "tu_SSID"; // Tu SSID
const char* password = "tu_contraseña"; // Tu contraseña Wi-Fi

// Definiciones de pines
const int sensorHumedadPin = A0; // Pin para el sensor de humedad del suelo
const int sensorTemperaturaPin = A1; // Pin para el sensor de temperatura
const int bombaPin = 13; // Pin para controlar la bomba de agua

// Umbral de humedad del suelo para iniciar el riego
const int umbralHumedad = 30; // Valor de humedad del suelo en %
// URL de tu servidor PHP
const String serverUrl = "http://tu_dominio/insert_data.php"; // Cambia esto por la URL de tu servidor

void setup() {
    Serial.begin(115200);
    pinMode(bombaPin, OUTPUT); // Configurar el pin de la bomba como salida
    digitalWrite(bombaPin, LOW); // Asegurarse de que la bomba esté apagada al inicio

    // Conectar a la red Wi-Fi
    WiFi.begin(ssid, password);
    
    // Esperar a que se conecte
    while (WiFi.status() != WL_CONNECTED) {
        delay(1000);
        Serial.println("Conectando a WiFi...");
    }
    
    Serial.println("Conectado a WiFi");
}

void loop() {
    // Leer datos de los sensores
    int humedadSuelo = analogRead(sensorHumedadPin);
    int temperatura = analogRead(sensorTemperaturaPin);
    
    // Convertir los datos a un rango adecuado (ajusta según tu sensor)
    humedadSuelo = map(humedadSuelo, 0, 1023, 0, 100);
    temperatura = map(temperatura, 0, 1023, 15, 30); // Ejemplo para un sensor de temperatura

    // Activar la bomba si la humedad del suelo es menor que el umbral
    if (humedadSuelo < umbralHumedad) {
        Serial.println("Humedad del suelo baja. Activando la bomba...");
        digitalWrite(bombaPin, HIGH); // Encender la bomba
        delay(5000); // Mantener la bomba encendida durante 5 segundos
        digitalWrite(bombaPin, LOW); // Apagar la bomba
        Serial.println("Bomba apagada.");
    }

    // Crear un objeto HTTPClient
    if (WiFi.status() == WL_CONNECTED) { // Verificar que está conectado a WiFi
        HTTPClient http;

        // Configurar la URL
        http.begin(serverUrl);
        
        // Configurar los parámetros de la solicitud POST
        http.addHeader("Content-Type", "application/x-www-form-urlencoded");
        String httpRequestData = "fecha=" + String(millis()) + "&humedad_suelo=" + humedadSuelo + "&temperatura=" + temperatura;
        
        // Enviar la solicitud POST
        int httpResponseCode = http.POST(httpRequestData);

        // Comprobar la respuesta del servidor
        if (httpResponseCode > 0) {
            String response = http.getString();
            Serial.println(httpResponseCode); // Código de respuesta
            Serial.println(response); // Respuesta del servidor
        } else {
            Serial.print("Error en la solicitud POST: ");
            Serial.println(httpResponseCode);
        }

        // Finalizar la conexión
        http.end();
    } else {
        Serial.println("Error en la conexión WiFi");
    }

    delay(10000); // Esperar 10 segundos antes de la siguiente lectura
}
