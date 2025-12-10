# Requisitos de la prueba

## Login de usuario y contraseña
* **Formulario:** Crear una página simple con un formulario de inicio de sesión.
* **Dashboard:** Una vez logueado, debe mostrar un Dashboard.
* **Logout:** Debe tener la opción de cerrar sesión.
* **Usuarios:** Debe aceptar al menos **2 usuarios** con sus respectivas contraseñas predefinidas.

## Almacenamiento de datos
Cada vez que un usuario se loguee correctamente, se deberá registrar en una hoja de cálculo (**Google Sheets**) los siguientes datos:
* **Usuario**
* **Contraseña** (puede almacenarse encriptada)
* **Fecha y hora exacta** del inicio de sesión (formato: `dd/mm/aaaa - hh:mm`)

> **Importante:** Debes enviarnos el acceso al Google Sheets donde se almacenan esos datos.

## Automatización
Configurar una automatización mediante **Make (anteriormente Integromat)** para que:
* Cuando un usuario inicie sesión, se envíe automáticamente un **correo electrónico de notificación** indicando qué usuario accedió y a qué hora.

## Extras opcionales
*(No obligatorios, pero valorados)*
* Uso de **Tailwind CSS** o **Shadcn/ui** para el diseño.
* Integración con **Better Auth** para la autenticación.
* Publicación del proyecto en **Vercel** con acceso público.

## Entrega
1.  Enviar el **enlace al proyecto desplegado** (por ejemplo, en `vercel.app`).
2.  Adjuntar también el **repositorio de GitHub o GitLab** con el código fuente.

📅 **Fecha límite de entrega:** Miércoles 10 de Diciembre.