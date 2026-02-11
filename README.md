# Abrazos en línea - Prevención del Suicidio Adolescente

Este proyecto es una plataforma de apoyo y prevención diseñada con Next.js 15, React, Tailwind CSS y Genkit AI.

## 🚀 Instalación y Ejecución Local

Si deseas abrir y ejecutar este proyecto en tu computadora usando **Visual Studio Code**, sigue estos pasos:

1. **Requisitos previos:** Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18 o superior).
2. **Abrir el proyecto:** Abre la carpeta del proyecto en VS Code.
3. **Instalar dependencias:** Abre la terminal integrada (`Ctrl + Ñ` o `Cmd + J`) y ejecuta:
   ```bash
   npm install
   ```
4. **Configurar la IA (Opcional):** Crea un archivo llamado `.env.local` en la raíz y añade tu clave de API de Google Gemini:
   ```env
   GOOGLE_GENAI_API_KEY=tu_clave_aqui
   ```
5. **Iniciar el servidor:** Ejecuta el comando:
   ```bash
   npm run dev
   ```
6. **Ver el sitio:** Abre tu navegador en [http://localhost:9002](http://localhost:9002).

## 📤 Cómo subir el proyecto a GitHub

Para subir el proyecto a tu repositorio `https://github.com/APACHES6X/Abrazos-en-L-nea.git`:

1. **Inicializar y añadir archivos:**
   ```bash
   git init
   git add .
   ```
2. **Primer commit:**
   ```bash
   git commit -m "Initial commit: Proyecto Abrazos en línea completo"
   ```
3. **Conectar y subir:**
   ```bash
   git remote add origin https://github.com/APACHES6X/Abrazos-en-L-nea.git
   git branch -M main
   git push -u origin main
   ```

## 🌐 Cómo publicar el sitio (Crear un link/dominio)

Para que tu página sea pública y cualquiera pueda entrar, usa **Firebase App Hosting**:

1. **Entra a la Consola de Firebase:** Ve a [console.firebase.google.com](https://console.firebase.google.com/).
2. **Selecciona "App Hosting"** en el menú de la izquierda (dentro de la sección de Compilación/Build).
3. **Haz clic en "Comenzar":** Selecciona tu cuenta de GitHub y autoriza a Firebase.
4. **Conecta tu repositorio:** Elige el repositorio `Abrazos-en-L-nea`.
5. **Configura el despliegue:** Sigue los pasos (por defecto todo está configurado para Next.js).
6. **¡Listo!:** Firebase te dará una URL automática como `nombre-de-tu-proyecto.web.app`.

## 🛠 Tecnologías utilizadas
- **Framework:** Next.js 15 (App Router)
- **AI:** Genkit con Google Gemini
- **UI:** Shadcn/UI & Lucide Icons
- **Estilos:** Tailwind CSS
- **Tipografía:** Alegreya (Humanist Serif)
