# 📘 Capítulo 1: De JavaScript a React — Pensar en Componentes

## 📋 Índice
1. [Objetivos del Capítulo](#objetivos)
2. [Fundamentos de React](#fundamentos)
3. [Comparativa: HTML vs React](#comparativa)
4. [Componentes en React](#componentes)
5. [Estado y Eventos](#estado-eventos)
6. [Ejemplo Práctico: Login System](#ejemplo-practico)
7. [Trabajando con APIs](#apis)
8. [Ejercicios Prácticos](#ejercicios)
9. [Herramientas de Desarrollo](#herramientas)
10. [Conclusiones](#conclusiones)

## 🎯 Objetivos del Capítulo {#objetivos}
- Comprender la transición de JavaScript vanilla a React
- Aprender a estructurar una aplicación React moderna
- Implementar funcionalidades reales con APIs
- Entender el flujo de datos y el ciclo de vida en React
- Dominar el concepto de componentes y estado

## 🔍 Fundamentos de React {#fundamentos}

### ¿Qué es React?
React es una biblioteca de JavaScript para construir interfaces de usuario. Sus principales características son:
- Virtual DOM para renderizado eficiente
- Componentes reutilizables
- Flujo de datos unidireccional
- Ecosistema rico en herramientas y librerías

### JSX: HTML en JavaScript
JSX es una extensión de sintaxis para JavaScript que nos permite escribir HTML dentro de nuestro código:

```jsx
const elemento = <h1>Hola, {nombre}</h1>;
```

## 💻 Comparativa: HTML vs React {#comparativa}

### Enfoque Tradicional (HTML + JS + CSS)

```html
<!-- index.html -->
<div class="login-container">
  <h1>Iniciar sesión</h1>
  <form id="loginForm">
    <input type="text" id="username" placeholder="Usuario">
    <input type="password" id="password" placeholder="Contraseña">
    <button type="submit">Entrar</button>
  </form>
</div>

<script>
document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value
  };
  
  const res = await fetch("https://api.ejemplo.com/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  
  if (res.ok) alert("Login correcto");
  else alert("Error en credenciales");
});
</script>
```

### Enfoque Moderno (React)

```jsx
// Login.jsx
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function manejarSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch("https://api.ejemplo.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      setMensaje(res.ok ? "✅ Login correcto" : "❌ Credenciales incorrectas");
    } catch (err) {
      setMensaje("⚠ Error de conexión");
    }
  }

  return (
    <div className="login-container">
      <h1>Iniciar sesión</h1>
      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
}
```

## 🧩 Componentes en React {#componentes}

### Anatomía de un Componente
Un componente React es una función que:
1. Recibe props como parámetro
2. Retorna elementos JSX
3. Puede manejar su propio estado
4. Puede tener efectos secundarios

### Tipos de Componentes
1. **Componentes Funcionales** (Recomendados)
```jsx
function Saludo({ nombre }) {
  return <h1>Hola, {nombre}!</h1>;
}
```

2. **Componentes de Clase** (Legacy)
```jsx
class Saludo extends React.Component {
  render() {
    return <h1>Hola, {this.props.nombre}!</h1>;
  }
}
```

## 🔄 Estado y Eventos {#estado-eventos}

### useState Hook
```jsx
const [contador, setContador] = useState(0);
```

### useEffect Hook
```jsx
useEffect(() => {
  // Código a ejecutar
}, [dependencias]);
```

## 🛠 Ejemplo Práctico: Login System {#ejemplo-practico}

### Estructura de Archivos
```
src/
├── components/
│   ├── Login/
│   │   ├── Login.jsx
│   │   ├── LoginForm.jsx
│   │   └── LoginMessage.jsx
│   └── Usuarios/
│       └── Usuarios.jsx
├── App.jsx
└── main.jsx
```

### Ejemplo de Usuarios.jsx
```jsx
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function cargarUsuarios() {
      try {
        const res = await fetch("https://api.ejemplo.com/usuarios");
        const data = await res.json();
        setUsuarios(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    cargarUsuarios();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="usuarios-container">
      <h2>Usuarios registrados</h2>
      <ul>
        {usuarios.map((usuario) => (
          <li key={usuario.id}>{usuario.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
```

## 🌐 Trabajando con APIs {#apis}

### Mejores Prácticas
1. **Manejo de Estados**
   - Estado de carga
   - Estado de error
   - Estado de datos
2. **Separación de Responsabilidades**
   - Servicios API separados
   - Hooks personalizados
3. **Control de Errores**
   - Try/catch
   - Estados de error
   - Mensajes al usuario

### Custom Hook Example
```jsx
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, [url]);

  async function fetchData() {
    try {
      const res = await fetch(url);
      const json = await res.json();
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error };
}
```

## 💪 Ejercicios Prácticos {#ejercicios}

### Ejercicio 1: Sistema de Login
Crear un sistema completo de autenticación que incluya:
- Formulario de login
- Registro de usuarios
- Lista de usuarios
- Perfil de usuario
- Persistencia de sesión

### Ejercicio 2: Dashboard
Implementar un dashboard que muestre:
- Estadísticas de usuarios
- Gráficos con datos
- Filtros y búsqueda
- Paginación

## 🔧 Herramientas de Desarrollo {#herramientas}

### React Developer Tools
- Inspección de componentes
- Debugging de estado
- Análisis de rendimiento

### ESLint y Prettier
- Configuración recomendada
- Reglas específicas para React
- Integración con VS Code

## 🎓 Conclusiones {#conclusiones}

### Conceptos Clave Aprendidos
- Componentes y props
- Estado y ciclo de vida
- Eventos y formularios
- Integración con APIs
- Patrones de diseño en React

### Próximos Pasos
- Context API
- React Router
- Redux/Zustand
- Testing en React
- Optimización de rendimiento

---

💡 **Recuerda**: React es declarativo, lo que significa que nos enfocamos en *qué* queremos mostrar, no en *cómo* manipular el DOM para mostrarlo.