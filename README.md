# 🌎 Explorer App

Aplicación web que permite explorar diferentes países del mundo, consultar información y encontrar países mediante búsquedas y filtros. Este proyecto fue desarrollado como parte de las actividades académicas de la asignatura Diseño Web Adaptable de la Universidad de Oriente (UNIVO).

## Tecnologías utilizadas

- **Vite:** entorno de desarrollo y herramienta de compilación.
- **TypeScript:** lenguaje utilizado para desarrollar la lógica de la aplicación con tipado estático.
- **Tailwind CSS v4:** framework para diseñar una interfaz adaptable.
- **REST Countries API v5:** fuente de información de los países y sus banderas.
- **Git y GitHub:** herramientas para el control de versiones y la administración del repositorio.
- **Vercel:** plataforma utilizada para desplegar la aplicación y generar vistas previas.

## Funcionalidades implementadas

- Listado de países con bandera, nombre, población, región y capital.
- Búsqueda de países por nombre.
- Filtrado de países por región.
- Debounce de 300 milisegundos para optimizar las búsquedas.
- Visualización de estados de carga, skeleton, resultados vacíos y errores.
- Vista de detalle de cada país mediante navegación SPA con hash routing.
- Diseño adaptable a diferentes tamaños de pantalla.
- Tipografía fluida mediante la función `clamp()`.
- Navegación con teclado y foco visible en el enlace **Ver más**.
- Efectos visuales en los botones para mejorar la interacción con el usuario.

## Requisitos previos

Para ejecutar este proyecto en tu equipo necesitas tener instalado:

- Node.js.
- pnpm.
- Git.

##  Instalación

### 1. Clonar el repositorio

Abre una terminal y ejecuta los siguientes comandos:

```bash
git clone https://github.com/Kcruz080492/ExplorerApp.git
cd ExplorerApp
```

### 2. Instalar las dependencias

```bash
pnpm install
```

### 3. Configurar la API

Crea un archivo llamado `.env` en la raíz del proyecto y agrega la variable de entorno correspondiente:

```env
VITE_REST_COUNTRIES_API_KEY=TU_CLAVE_DE_API
```

Sustituye `TU_CLAVE_DE_API` por la clave que te proporciona REST Countries, si tu configuración de la API la requiere.

**Importante:** no publiques tu clave real en GitHub. El archivo `.env` debe mantenerse fuera del repositorio.

Las variables que comienzan con `VITE_` pueden incorporarse al código del navegador. Por ello, no debes utilizarlas para almacenar claves que necesiten mantenerse secretas.

### 4. Ejecutar el proyecto en desarrollo

```bash
pnpm dev
```

Vite mostrará en la terminal la dirección local para abrir la aplicación en el navegador, normalmente:

```text
http://localhost:5173/
```

## Compilación del proyecto

Para comprobar que el proyecto compila correctamente, ejecuta:

```bash
pnpm build
```

Si deseas revisar la versión compilada en tu equipo, ejecuta:

```bash
pnpm preview
```

## Despliegue

El proyecto puede publicarse en Vercel. Para ello, configura las variables de entorno que realmente utiliza la aplicación y verifica que estén disponibles en los entornos correspondientes.

Después de desplegarlo, comprueba que la búsqueda, los filtros, la consulta de información y la navegación funcionen correctamente.

## Autor

Emerson Raúl Ventura Castillo