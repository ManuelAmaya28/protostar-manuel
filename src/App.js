//Para la realización de este ejercicio se usó principalmente la documentación que proporciona el propio npm react-moveable:
//https://www.npmjs.com/package/react-moveable?activeTab=readme
// Esto para entender el funcionamiento de la libreria del cual nos daba las herramientas para realizar el ejercicio sin necesidad
// de usar useState, sin embargo se implementó. 

//Sabiendo esto la explicacion de la funcion es obtener los datos que obtenemos de las funciones onDrag y onResize para entregar los
//valores en los estilos CSS de la imagen solicitada, de esta manera obteniendo una imagen que cambia de posición y tamaño
//en tiempo real

import React, { useState, useRef } from 'react';
import Moveable from "react-moveable";

export default function App() {

  //Crea los estados para width y height utilizando useState como funciones para la asignacion de los valores obtenidos en la
  //interaccion del usuario con los controles tactiles 
  const targetRef = useRef(null);
  const [width, setWidth] = useState("auto");
  const [height, setHeight] = useState("auto");
 
  //En este caso, estuve solicitando la imagen por medio de FETCH pero presenta un error relacionado con los CORS,
  // decidí dejar el fetch con manejo de error para no interrumpir la página como evidencia y usar un enlace directo en <img/>
  // let miImagen;
  // fetch("https://via.placeholder.com/200x200.png?text=Move+me!").then(function (response) {
  //   if (response.ok) {
  //     response.blob().then(function (miBlob) {
  //       var objectURL = URL.createObjectURL(miBlob);
  //       miImagen.src = objectURL;
  //     });
  //   } else {
  //     console.log('Respuesta de red OK pero respuesta HTTP no OK');
  //   }
  // })
  //   .catch(function (error) {
  //     console.log('Hubo un problema con la petición Fetch:' + error.message);
  //   });

  return (

    //Se crea un container que dentro tiene la imagen con los valores width y height que se le asiganara por medio de los estados
    //anteriormente declarados
    <div className="root">
      <div className="container">
        <img
          src="https://via.placeholder.com/200x200.png?text=Move+me!"
          alt="moveMe"
          className="target"
          ref={targetRef}
          style={{
            width: width,
            height: height,
            position: "auto",
          }}
        />
        <Moveable
          target={targetRef}
          resizable={true}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onResize={(e) => {
            setWidth(`${e.width}px`);
            setHeight(`${e.height}px`);
            e.target.style.transform = e.drag.transform;
          }}
          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          onDrag={(e) => {
            e.target.style.transform = e.transform;
          }}
        />
      </div>
    </div>
  );
}