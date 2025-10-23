import { useState } from "react";
import React from "react";
import "../../styles.css"
export default function Login(){
    const [userName, setUserName] = useState("");
    const [password,setPassword] = useState("");
    const [mensaje,setMensaje] = useState("");
    const [usuarios,setUsuario] = useState([]);

    function mostrarMensaje(mensaje,tipo){
        switch (tipo) {
            case 1:
                return console.log(mensaje);
                break;
            case 2:
                return console.warn(mensaje);
                break;
            case 3:
                return console.error(mensaje);
                break;
        }
        
    }

    async function manejarSubmit(e){
        e.preventDefault();

        const nuevoUsuario = {
            userName : userName,
            password: password
        };
         // Guarda true si el usuario ya existía en el arreglo usuarios
        const usuarioExiste = usuarios.some((usuario) => usuario.userName === nuevoUsuario.userName);


            console.log("Registrando usuario...");
            if(usuarioExiste){
                setMensaje("❌ Usuario ya logeado");
                mostrarMensaje("Usuario ya logeado", 2);
            }else{
                if(userName && password){
                    // Usa el spread operator `...` para crear una nueva copia del array
                    // y añade el nuevo objeto al final.
                    setUsuario([...usuarios, nuevoUsuario]);
                    setMensaje("✅ Usuario logeado exitosamente");
                    mostrarMensaje("Usuario logeado exitosamente", 1);
                }else{
                    setMensaje("❌ Usuario invalido");
                    mostrarMensaje("Error: usuario invalido", 3);
                }
            }            
            
    }

 // Para ver el estado actualizado después de que el componente se re-renderice
    React.useEffect(() => {
        mostrarMensaje(usuarios, 1);
    }, [usuarios]);

return (
<div className="login-container">
    <h2>Iniciar sesión</h2>
    <form onSubmit={manejarSubmit}>
        <input 
        type="text" 
        placeholder="Usuario" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)}
        />
        <input 
        type="password" 
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
    </form>
    {mensaje && <p className="mensaje">{mensaje}</p>}
</div>

);

}

