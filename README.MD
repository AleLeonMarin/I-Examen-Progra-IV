# Proyecto: I-Examen-Progra-IV

## Nombres de los integrantes del grupo:
- Alejandro León Marín
- Brian Zeledón Esquivel
- Kendall Fonseca
- Marconi Calvo Campos

---

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalados los siguientes programas y herramientas:

1. **Node.js** (versión 20 o superior): [Descargar Node.js](https://nodejs.org/)
2. **Python** (versión 3.7 o superior): [Descargar Python](https://www.python.org/downloads/)
3. **Gestor de paquetes npm**: Se instala automáticamente con Node.js.
4. **Flask**: Framework para el backend. Instálalo ejecutando:
   ```bash
   pip install flask flask-cors faker
   ```

---

## Instalación

### 1. Clonar el repositorio
Clona este repositorio en tu máquina local:
```bash
git clone https://github.com/tu-usuario/I-Examen-Progra-IV.git
cd I-Examen-Progra-IV
```

### 2. Configuración del Backend (API Flask)
1. Navega al directorio del backend:
   ```bash
   cd src/api-flask
   ```
2. Instala las dependencias necesarias:
   ```bash
   pip install flask flask-cors faker
   ```
3. Inicia el servidor Flask:
   ```bash
   python app.py
   ```
   El servidor estará disponible en `http://localhost:5000`.

### 3. Configuración del Frontend (Remix)
1. Navega al directorio del frontend:
   ```bash
   cd ../front
   ```
2. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` en el directorio `front` con el siguiente contenido:
   ```env
   VITE_FLASK_API_URL=http://localhost:5000/api
   ```
4. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

---

## Desarrollo del Proyecto

### 1. ¿Qué técnica utilizaste para manejar el estado y por qué?
Se utilizó el hook `useState` de React para manejar el estado local en componentes como `Index` y `UserTable`. Además, se encapsuló la lógica de estado en hooks personalizados como `useUsers`, `useFilteredUsers` y `useSortUsers`. Esto permite separar la lógica de negocio del componente principal, facilitando la reutilización y el mantenimiento del código.

### 2. ¿Cómo evitaste renders y cálculos innecesarios?
- Se utilizó `useMemo` en el hook `useFilteredUsers` para memorizar los resultados del filtrado, evitando cálculos innecesarios cuando los datos o el filtro no cambian.
- En el hook `useSortUsers`, se utilizó `useCallback` para memorizar la función de ordenamiento y evitar que se recree en cada render.
- La lógica de renderizado condicional en componentes como `Modal` y `ConfirmModal` asegura que solo se rendericen cuando sea necesario.

### 3. ¿Cómo organizaste la lógica de carga y manejo de errores?
- La lógica de carga de datos se encapsuló en el hook `useUsers`, que maneja el estado de carga (`loading`), errores (`error`) y los datos originales (`originalUsers`) para restaurar el estado inicial.
- Los errores se detectan en el `fetch` y se almacenan en el estado `error`. Si ocurre un error, se muestra un modal informativo al usuario.

### 4. ¿Qué decisiones tomaste respecto a la estructura y tipado de los datos?
- Se definió una interfaz `User` en TypeScript para tipar los datos de usuario, asegurando consistencia en todo el proyecto.
- Los datos de usuario incluyen campos opcionales (`name`, `surname`, `country`, `photo`) para manejar casos en los que falten datos, como se simula en el backend con Flask.

### 5. ¿Cómo garantizaste que la experiencia del usuario fuera fluida?
- Se implementaron indicadores visuales como un mensaje de "Cargando usuarios" mientras se obtienen los datos.
- Se usaron modales (`Modal` y `ConfirmModal`) para manejar errores y confirmaciones de acciones, mejorando la interacción del usuario.
- La tabla de usuarios incluye funcionalidades como filtrado, ordenamiento y restauración de datos, lo que permite una navegación intuitiva.
- El diseño responsivo asegura que la interfaz sea accesible en diferentes dispositivos.

---

## Recursos Adicionales

- 📖 [Documentación de Remix](https://remix.run/docs)
- 📖 [Documentación de Flask](https://flask.palletsprojects.com/)