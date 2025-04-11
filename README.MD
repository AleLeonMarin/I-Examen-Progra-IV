
# Proyecto: I-Examen-Progra-IV

## Integrantes del Grupo
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
Para comenzar, clona este repositorio en tu máquina local utilizando Git:

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
   El backend quedará disponible en: [http://localhost:5000](http://localhost:5000)

### 🎨 3. Configuración del Frontend (Remix + React)
1. Navega al directorio del frontend:
   ```bash
   cd ../front
   ```
2. Instala las dependencias necesarias con npm:
   ```bash
   npm install
   ```
3. Crea un archivo `.env` con la configuración de la URL del backend:
   ```env
   VITE_FLASK_API_URL=http://localhost:5000/api
   ```
4. Levanta el servidor de desarrollo de Remix:
   ```bash
   npm run dev
   ```
   Accede al sistema desde: [http://localhost:3000](http://localhost:3000)

---

## 🛠️ Desarrollo del Proyecto

### 1. **¿Qué técnica utilizaste para manejar el estado y por qué?**
Se empleó el hook `useState` de React para el manejo de estado local, específicamente en componentes como `Index` y `UserTable`. Además, se implementaron hooks personalizados como `useUsers`, `useFilteredUsers` y `useSortUsers` para desacoplar la lógica del estado, mejorando la reutilización y mantenimiento del código.

### 2. **¿Cómo evitaste renders y cálculos innecesarios?**
- Se utilizó `useMemo` en `useFilteredUsers` para memorizar los resultados del filtrado.
- En `useSortUsers`, se empleó `useCallback` para evitar recreaciones innecesarias de funciones.
- Se aplicó renderizado condicional en `Modal` y `ConfirmModal`, evitando renders innecesarios.

### 3. **¿Cómo organizaste la lógica de carga y manejo de errores?**
- La carga de usuarios y su estado se encapsularon en el hook `useUsers`.
- Se gestionó el estado de `loading`, `error` y `originalUsers` para restauraciones.
- Los errores capturados se reflejan mediante modales informativos.

### 4. **¿Qué decisiones tomaste respecto a la estructura y tipado de los datos?**
- Se definió la interfaz `User` en TypeScript para garantizar consistencia en los datos.
- Se previeron campos opcionales como `name`, `surname`, `country` y `photo` para simular escenarios reales con datos incompletos.

### 5. **¿Cómo garantizaste que la experiencia del usuario fuera fluida?**
- Se añadieron indicadores visuales durante la carga de datos.
- Se integraron modales para manejo de errores y confirmaciones.
- La tabla de usuarios cuenta con búsqueda, ordenamiento y restauración.
- El diseño responsivo facilita el acceso desde múltiples dispositivos.

---

## 📚 Recursos Adicionales

- 📖 [Documentación oficial de Remix](https://remix.run/docs)
- 📖 [Documentación oficial de Flask](https://flask.palletsprojects.com/)

---

🚀 ¡Gracias por revisar nuestro proyecto! Esperamos que te resulte útil y funcional. Para cualquier duda o sugerencia, no dudes en contactarnos.
