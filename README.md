# Sistema de login con Dashboard y Automatización

Sistema de autenticación desarrollado con React, Supabase y Make. Permite el ingreso de usuarios, registro de cuentas nuevas y notificación automática de accesos vía correo electrónico.

## Enlaces del Proyecto

* **Sitio publico (Vercel):**
    [Ver Web](https://prueba-call-bot-ia.vercel.app/)
  
* **Google Sheets (Base de Datos de Logs):**
    [Ver Hoja de Cálculo](https://docs.google.com/spreadsheets/d/1NJm5Izg1t6rbfKRLdfyZk7kBo2zWZTTe_onF8vY3fjc/edit?usp=sharing)
    *Acá se registran automáticamente los inicios de sesión exitosos.*

* **Escenario de Make (Automatización):**
    [Ver Escenario](https://us2.make.com/public/shared-scenario/bZxsDtRDguG/integration-webhooks-google-sheets)
    *Flujo que conecta el Webhook del frontend con Google Sheets y Gmail.*

---

## Credenciales de Prueba

Podés utilizar estos usuarios predefinidos para probar el sistema inmediatamente:

| Usuario | Contraseña |
| :--- | :--- |
| `callbot` | `callbot` |
| `admin` | `1234` |

---

## Funcionalidades

1.  **Inicio de Sesión (Login):**
    * Validación contra base de datos en **Supabase**.
    * Las contraseñas viajan y se comparan encriptadas (SHA-256) para mayor seguridad.
    * Manejo de errores (usuario incorrecto, error de conexion).

2.  **Registro de Usuarios (Sign Up) :**
    * Función para registrar nuevos usuarios en la base de datos.
    * Validación para evitar nombres de usuario duplicados.
    * Guardado automático de contraseña con encriptación.

3.  **Dashboard:**
    * Panel de bienvenida protegido (solo accesible si estás logueado).
    * Muestra el usuario actual.
    * Botón para cerrar sesión (Logout).

---

## Automatización y Logs

El sistema cuenta con una integración via **Webhooks** con Make que realiza lo siguiente cada vez que un usuario se loguea correctamente:

1.  **Registro en Sheets:** Guarda Usuario, Contraseña (encriptada), Fecha y Hora exacta del acceso.
2.  **Alerta por Correo:** Envía un email automático **al administrador** (la dirección está configurada dentro del escenario de Make) informando quién accedió (tambien al usuario si tiene formato de mail).

---

## Instalación Local

1.  Clonar el repositorio.
2.  Instalar dependencias:
    ```bash
    npm install
    ```
3.  Configurar las variables de entorno en un archivo `.env`:
    ```env
    REACT_APP_SUPABASE_URL
    REACT_APP_SUPABASE_KEY
    REACT_APP_MAKE_URL
    ```
4.  Iniciar el proyecto:
    ```bash
    npm start
    ```
