
Vamos a crear el Capítulo 1 del Manual de Aprendizaje de React para un Programador Junior.
El enfoque será didáctico, práctico y progresivo, y añadiremos ejemplos con HTML, CSS y fetch (POST/GET) en un login clásico para afianzar cómo React se aplica al mundo real.

🧠 Capítulo 1: De JavaScript a React — Pensar en Componentes
1. 📋 Objetivo del capítulo

Comprender cómo React reemplaza el HTML y JS tradicionales.

Aprender a estructurar una aplicación React moderna.

Implementar un login funcional con fetch API.

Entender el flujo de datos y renderizado de React.

2. 🔎 De HTML clásico a React moderno
🔸 En HTML + JS + CSS

Un login típico se vería así:
``` html
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

<style>
.login-container {
  max-width: 300px;
  margin: 40px auto;
  text-align: center;
}
input {
  display: block;
  width: 100%;
  margin-bottom: 10px;
  padding: 8px;
}
</style>

```
🔸 En React (mismo caso)

En React no manipulamos el DOM con document.getElementById(),
sino que reactivamos el estado y React actualiza el DOM por nosotros.

3. ⚛ Reescribiendo el Login en React
``` javascript
// Login.jsx
import { useState } from "react";
import "./Login.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  async function manejarSubmit(e) {
    e.preventDefault();

    const user = { username, password };

    try {
      const res = await fetch("https://api.ejemplo.com/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      if (res.ok) {
        setMensaje("✅ Login correcto");
      } else {
        setMensaje("❌ Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setMensaje("⚠ Error de conexión con el servidor");
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

🎨 CSS asociado (Login.css)
.login-container {
  max-width: 320px;
  margin: 50px auto;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0px 2px 8px rgba(0,0,0,0.1);
}

h1 {
  margin-bottom: 20px;
  color: #333;
}

input {
  display: block;
  width: 100%;
  margin-bottom: 12px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  transition: border 0.3s;
}

input:focus {
  border: 1px solid #007bff;
  outline: none;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.mensaje {
  margin-top: 15px;
  color: #555;
  font-size: 0.9rem;
}
```
4. ⚙ Integrando en la aplicación principal
``` javascript
// App.jsx
import Login from "./Login";

export default function App() {
  return (
    <div>
      <Login />
    </div>
  );
}
```

Y tu punto de entrada (ReactDOM):
``` javascript
// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
```
5. 🔄 Fetch GET — Ejemplo: Mostrar usuarios luego del login

Supongamos que después del login queremos listar los usuarios:
``` javascript
// Usuarios.jsx
import { useEffect, useState } from "react";

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    async function cargarUsuarios() {
      const res = await fetch("https://api.ejemplo.com/usuarios");
      const data = await res.json();
      setUsuarios(data);
    }
    cargarUsuarios();
  }, []);

  return (
    <div>
      <h2>Usuarios registrados</h2>
      <ul>
        {usuarios.map((u) => (
          <li key={u.id}>{u.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
```

🔹 Por qué así:

`useEffect()` se ejecuta una sola vez al montar el componente (como componentDidMount en clases).

Mantiene la lógica asíncrona aislada dentro del componente, mejorando la limpieza del código.

6. 🧠 Pensando en Componentes

React promueve dividir la interfaz en partes independientes, donde cada parte controla su propio estado y renderizado.

📦 Ejemplo de descomposición del login:

App.jsx
 ├── Header.jsx
 ├── Login.jsx
 │    ├── LoginForm.jsx
 │    └── LoginMessage.jsx
 └── Footer.jsx


Así, cada pieza tiene una responsabilidad clara:

LoginForm → Maneja inputs y envío.

LoginMessage → Muestra el resultado.

Login → Orquesta la lógica general.

Esto permite reutilización, testeo y mantenimiento.

7. 🔍 Comparación resumida: HTML vs React
Concepto	En HTML/JS	En React
Modificación del DOM `document.querySelector()`	React Virtual DOM
Reutilización	Duplicación de HTML	Componentes reutilizables
Eventos	`addEventListener()`	onClick, onSubmit, etc.
Estado	Variables globales	useState, useEffect
Estilo	CSS externo o inline	CSS Modules, Tailwind o inline dinámico
Comunicación	fetch, manual	fetch dentro de Hooks y efectos
8. 🚀 Ejercicio práctico sugerido

🧩 Desafío:
Crea un pequeño sistema de login y registro con dos componentes:

Login.jsx (POST)

Usuarios.jsx (GET)

Luego agrega un Header.jsx que cambie su texto según el estado de sesión.
Ejemplo:

“Bienvenido, Elian 👋” si el login fue exitoso.

“Por favor inicia sesión” si no lo fue.

💡 Tip: guarda el token del login en localStorage y úsalo en useEffect para mantener la sesión activa.

9. 🧭 Conclusión del capítulo

Al finalizar este capítulo, aprendiste:

Cómo pensar en React en lugar de manipular el DOM.

Qué son los componentes, estado y eventos.

Cómo integrar HTML y CSS clásicos dentro de React.

Cómo comunicarte con un backend usando fetch POST/GET.

El por qué de React:

React simplifica el flujo de datos, separa responsabilidades y permite construir interfaces escalables con un código declarativo, limpio y reutilizable.