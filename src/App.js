import React from 'react';
import Moveable from "react-moveable";

export default function App() {
  const targetRef = React.useRef(null);

//En este caso, estuve solicitando la imagen por medio de FETCH pero presenta un error relacionado con los CORS,
// decidí dejar el fetch con manejo de error para no interrumpir la página como evidencia y usar un enlace directo en <img/>
  let miImagen;
  fetch("https://via.placeholder.com/200x200.png?text=Move+me!").then(function(response) {
    if(response.ok) {
      response.blob().then(function(miBlob) {
        var objectURL = URL.createObjectURL(miBlob);
        miImagen.src = objectURL;
      });
    } else {
      console.log('Respuesta de red OK pero respuesta HTTP no OK');
    }
  })
  .catch(function(error) {
    console.log('Hubo un problema con la petición Fetch:' + error.message);
  });


  return (
    <div className="root">
      <div className="container">
        <img src="https://via.placeholder.com/200x200.png?text=Move+me!" alt="moveMe" className="target" ref={targetRef} style={{
          maxWidth: "auto",
          maxHeight: "auto",
          minWidth: "auto",
          minHeight: "auto",
        }} />
        <Moveable
          target={targetRef}
          resizable={true}
          keepRatio={false}
          throttleResize={1}
          renderDirections={["nw", "n", "ne", "w", "e", "sw", "s", "se"]}
          onResize={e => {
            e.target.style.width = `${e.width}px`;
            e.target.style.height = `${e.height}px`;
            e.target.style.transform = e.drag.transform;
          }}

          draggable={true}
          throttleDrag={1}
          edgeDraggable={false}
          startDragRotate={0}
          throttleDragRotate={0}
          onDrag={e => {
            e.target.style.transform = e.transform;
          }}
        />

      </div>
    </div>
  );
}