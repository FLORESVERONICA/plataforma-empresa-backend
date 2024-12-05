# Plataforma de Empresa - Backend

Este repositorio contiene el backend de la **Plataforma de Empresa**, un sistema diseñado para gestionar departamentos clave como **Recursos Humanos**, **Producción**, y la autenticación y gestión de usuarios. El backend está desarrollado con **Node.js**, **Express** y **MongoDB**, y sigue una estructura modular que facilita su escalabilidad y mantenimiento.

---

## **Estructura del proyecto**

backend-plataforma-empresa/
├── config/
│   └── db.js              # Configuración de la conexión a MongoDB
├── controllers/
│   ├── authController.js  # Controladores para autenticación y roles
│   ├── produccionController.js  # Controladores para departamentos y puestos
│   └── rrhhController.js  # Controladores para trabajadores y calendario laboral
├── middlewares/
│   └── authMiddleware.js  # Middleware para proteger rutas y verificar roles
├── models/
│   ├── Department.js      # Modelo para departamentos
│   ├── Employee.js        # Modelo para empleados
│   ├── Holiday.js         # Modelo para días festivos
│   └── User.js            # Modelo para usuarios
├── routes/
│   ├── authRouter.js      # Rutas para autenticación y roles
│   ├── produccionRouter.js # Rutas para departamentos y puestos
│   └── rrhhRouter.js      # Rutas para trabajadores y calendario
├── .env                   # Variables de entorno (no debe subirse al repositorio)
├── .gitignore             # Archivos y carpetas a ignorar por Git
├── index.js               # Archivo principal, configura el servidor
├── package.json           # Información del proyecto y dependencias
└── README.md              # Documentación del proyecto


El proyecto está organizado de la siguiente manera:

### **1. Carpeta `config`**
- **`db.js`**: Configuración de la conexión a la base de datos MongoDB. Las credenciales están almacenadas en el archivo `.env`.

### **2. Carpeta `controllers`**
Contiene los controladores principales para la lógica de negocio:
- **`authController.js`**: 
  - **Registro de usuarios**: Los nuevos usuarios son registrados con el rol predeterminado de *Trabajador*.
  - **Inicio de sesión (login)**: Redirige al usuario según su rol:
    - Trabajadores tienen acceso limitado.
    - Administradores tienen acceso completo.
  - **Asignación de roles**: Permite a los administradores cambiar el rol de un usuario.
  - **Creación de administradores**: Solo puede realizarse desde el backend, no está expuesto al frontend.

- **`produccionController.js`**:
  - Crear, buscar y eliminar **departamentos**.
  - Crear, buscar y eliminar **puestos de trabajo** dentro de los departamentos.

- **`rrhhController.js`**:
  - Gestionar la **lista de trabajadores**: Crear, buscar y eliminar registros de empleados.
  - Gestionar el **calendario laboral**:
    - Crear días festivos.
    - Eliminar días festivos.

### **3. Carpeta `middlewares`**
- **`authMiddleware.js`**: Middleware que verifica la autenticación y los roles de usuario para proteger rutas específicas.

### **4. Carpeta `models`**
Contiene los esquemas de datos utilizados con **Mongoose**:
- **`Department.js`**: Modelo para los departamentos.
- **`Employee.js`**: Modelo para los empleados, con información como nombre, estado (activo/inactivo) y datos de contacto.
- **`Holiday.js`**: Modelo para los días festivos en el calendario laboral.
- **`User.js`**: Modelo para usuarios con campos como nombre, correo, contraseña y rol.

### **5. Carpeta `routes`**
Define las rutas para la API:
- **`authRouter.js`**: Rutas para autenticación y gestión de roles.
- **`produccionRouter.js`**: Rutas para departamentos y puestos de trabajo.
- **`rrhhRouter.js`**: Rutas para trabajadores y el calendario laboral.

### **6. Archivo `index.js`**
- Configura el servidor Express.
- Conecta MongoDB utilizando `db.js`.
- Integra las rutas y middlewares globales.
- Inicia el servidor en el puerto especificado en `.env`.

### **7. Archivo `.env`**
Almacena las variables de entorno, como:

### **8. Tecnologias utilizas**
`Node.js`  y `Express`  Framework para el backend y creación de API REST.
`MongoCB`BAse de datos
`JWT` Manejo de autentificación segura basada en tokens
`Dotenv`Gestion de variables de entorno

