# TallerFlow

![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.2.4-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwindcss&logoColor=white)

**TallerFlow** es un sistema moderno y eficiente para la gestión de órdenes de trabajo en talleres mecánicos y gomerías. Diseñado como una Single Page Application (SPA), ofrece una experiencia fluida para la recepción de vehículos y la visualización del estado de las reparaciones en tiempo real.

---

## 🚀 Características Principales

### 📋 Panel de Recepción

Optimizado para el personal administrativo, permite gestionar el ciclo de vida completo de las órdenes.

- **Gestión de Órdenes:** Creación, edición y actualización de estados ("Pendiente", "En Progreso", "Completado").
- **Búsqueda Normalizada:** Encuentra órdenes rápidamente por nombre de cliente o patente/matrícula (insensible a mayúsculas/espacios).
- **Filtros Dinámicos:** Visualiza órdenes por su estado actual con un solo clic.

### 📺 Modo TV / Taller

Una vista dedicada y optimizada para pantallas grandes en el área de trabajo.

- **Solo Lectura:** Interfaz limpia sin controles de edición para evitar modificaciones accidentales.
- **Actualización en Tiempo Real:** Refleja instantáneamente los cambios realizados desde la recepción gracias al estado global compartido.
- **Alta Visibilidad:** Tipografía y contrastes ajustados para ser legibles a distancia.

### 🛠️ Herramientas Adicionales

- **Exportación CSV:** Descarga reportes completos de las órdenes para análisis externo o respaldo.
- **Sistema de Notificaciones:** Feedback visual inmediato (Toasts) para cada acción importante (guardado, error, etc.).

---

## 📸 Demo

![Creación de Órdenes](docs/create_orders_test_part2_1765518803642.webp)

---

## 💻 Instalación y Uso

Sigue estos pasos para ejecutar el proyecto en tu entorno local:

1.  **Clonar el repositorio:**

    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd GomeriaCentralSolucion
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Iniciar el servidor de desarrollo:**

    ```bash
    npm run dev
    ```

4.  **Acceder a la aplicación:**
    - **Panel de Recepción:** Abre `http://localhost:5173/` en tu navegador.
    - **Modo TV:** Abre `http://localhost:5173/tv` para la vista de taller.

---

## 📂 Estructura del Proyecto

El código fuente se encuentra organizado en la carpeta `src`:

```
src/
├── components/   # Componentes UI reutilizables (OrderCard, Forms, etc.)
├── context/      # Estado global (OrderContext) y lógica de negocio
├── utils/        # Funciones auxiliares y helpers
└── views/        # Vistas principales de la aplicación
    ├── ReceptionDashboard.jsx  # Panel administrativo
    └── WorkshopDisplay.jsx     # Vista para modo TV/Taller
```

---

## 🗺️ Roadmap

Estado actual del desarrollo y planes futuros:

### Prioridad Alta

- [ ] **Backend y Base de Datos**: Persistencia real con Node.js y DB (PostgreSQL/MongoDB).
- [ ] **Autenticación**: Login seguro para el personal.
- [ ] **Catálogo de Servicios**: Gestión dinámica de servicios desde la UI.

### Prioridad Media

- [ ] **Historial**: Consulta de órdenes pasadas.
- [ ] **Dashboard**: Estadísticas y métricas de rendimiento.

---

## ⚠️ Consideraciones Técnicas

> [!IMPORTANT] > **Persistencia Local:** Actualmente, el sistema utiliza `LocalStorage` para guardar las órdenes.
> Si borras la caché del navegador o cambias de dispositivo, **los datos se perderán**. Esta es una solución temporal hasta la implementación del Backend.
