# Proyecto: I-Examen-Progra-IV

## 👥 Integrantes del Grupo

- **Alejandro León Marín**
- **Brian Zeledón Esquivel**
- **Kendall Fonseca**
- **Marconi Calvo Campos**

---

## 📋 Requisitos Previos

Antes de comenzar con la ejecución del proyecto, asegúrate de contar con las siguientes herramientas instaladas en tu sistema:

1. ✅ **Node.js** (versión 20 o superior) — [Descargar Node.js](https://nodejs.org/)
2. ✅ **Python** (versión 3.7 o superior) — [Descargar Python](https://www.python.org/downloads/)
3. ✅ **npm** (gestor de paquetes de Node.js) — Se instala automáticamente con Node.js.
4. ✅ **Flask** y dependencias necesarias para el backend:
   ```bash
   pip install flask flask-cors faker
   ```

---

## ⚙️ Instalación del Proyecto

### 🔁 1. Clonar el Repositorio

Clona este repositorio en tu máquina local utilizando Git:

```bash
git clone https://github.com/AleLeonMarin/I-Examen-Progra-IV.git
cd I-Examen-Progra-IV
```

### 🧠 2. Configuración del Backend (API en Flask)

1. Ingresa al directorio correspondiente al backend:
   ```bash
   cd src/api-flask
   ```
2. Instala los paquetes requeridos:
   ```bash
   pip install flask flask-cors faker
   ```
3. Ejecuta el servidor Flask:

   ```bash
   python app.py
   ```

   El backend estará disponible en: [http://localhost:5000](http://localhost:5000)

   > 💡 Si deseas visualizar directamente los datos JSON de los usuarios simulados por la API, puedes visitar: [http://localhost:5000/api/users](http://localhost:5000/api/users)

### 🎨 3. Configuración del Frontend (Remix + React)

1. Navega al directorio del frontend:
   ```bash
   cd ../front
   ```
2. Instala las dependencias necesarias con npm:
   ```bash
   npm i
   ```
3. Crea un archivo `.env` en el directorio `front` con el siguiente contenido:
   ```env
   VITE_FLASK_API_URL=http://localhost:5000/api
   ```
4. Levanta el servidor de desarrollo de Remix:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en: [http://localhost:5173](http://localhost:5173)

---

## 🛠️ Desarrollo del Proyecto

### 1. **¿Qué técnica utilizaste para manejar el estado y por qué?**

Se empleó el hook `useState` de React para el manejo de estado local en componentes como `Index` y `UserTable`. Además, se implementaron hooks personalizados como `useUsers`, `useFilteredUsers` y `useSortUsers` para desacoplar la lógica del estado del componente principal, mejorando así la reutilización y mantenibilidad.

### 2. **¿Cómo evitaste renders y cálculos innecesarios?**

- Se utilizó `useMemo` en `useFilteredUsers` para memorizar los resultados del filtrado.
- Se aplicó `useCallback` en `useSortUsers` para evitar la recreación de funciones en cada render.
- El renderizado condicional en `Modal` y `ConfirmModal` asegura que solo se rendericen cuando es estrictamente necesario.

### 3. **¿Cómo organizaste la lógica de carga y manejo de errores?**

- Se encapsuló toda la lógica de carga dentro del hook `useUsers`, donde se gestionan los estados de `loading`, `error` y `originalUsers`.
- Los errores detectados durante la carga se almacenan en el estado `error` y son comunicados al usuario mediante un modal informativo.

### 4. **¿Qué decisiones tomaste respecto a la estructura y tipado de los datos?**

- Se definió una interfaz `User` en TypeScript para mantener un tipado fuerte y consistente a lo largo del proyecto.
- Los atributos `name`, `surname`, `country` y `photo` se definieron como opcionales, replicando situaciones reales donde pueden faltar datos de usuarios.

### 5. **¿Cómo garantizaste que la experiencia del usuario fuera fluida?**

- Se implementaron mensajes visuales como "Cargando usuarios..." durante el fetch de datos.
- Se incluyeron modales intuitivos para mostrar errores y confirmaciones de acciones.
- La tabla de usuarios ofrece funcionalidades como búsqueda, ordenamiento y restauración.
- El diseño responsivo asegura compatibilidad y accesibilidad desde múltiples dispositivos.

---

## 📚 Recursos Adicionales

- 📖 [Documentación oficial de Remix](https://remix.run/docs)
- 📖 [Documentación oficial de Flask](https://flask.palletsprojects.com/)

---

🚀 ¡Gracias por revisar nuestro proyecto! Esperamos que te resulte útil y funcional. Para cualquier duda o sugerencia, no dudes en contactarnos.
