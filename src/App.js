import { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadoImagenes from "./components/ListadoImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaactual, guardarPaginaActual] = useState(1);
  const [totalpaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    const consultarAPI = async () => {
      if (busqueda === "") return;

      const imagenesPorPagina = 30;
      const key = "22701720-2418a81db2c0850cff11eb943";
      const url = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaactual}`;
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
      guardarImagenes(resultado.hits);

      // Calcular el total de paginas
      const calcularTotalPaginas = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalPaginas);

      // Scroll Up
      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };
    consultarAPI();
  }, [busqueda, paginaactual]);

  // Ir a pagina anterior
  const paginaAnterior = () => {
    const nuevaPaginaActual = paginaactual - 1;
    if (nuevaPaginaActual === 0) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  // Ir a pagina siguiente
  const paginaSiguiente = () => {
    const nuevaPaginaActual = paginaactual + 1;
    if (nuevaPaginaActual > totalpaginas) return;
    guardarPaginaActual(nuevaPaginaActual);
  };

  return (
    <div className="container">
      <div className="jumbotron mt-3">
        <p className="lead text center">Pixabay Image Generator</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center mb-3">
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente
          </button>
        )}
        <ListadoImagenes imagenes={imagenes} />
        {paginaactual === 1 ? null : (
          <button
            type="button"
            className="btn btn-info mr-1"
            onClick={paginaAnterior}
          >
            Anterior
          </button>
        )}
        {paginaactual === totalpaginas ? null : (
          <button
            type="button"
            className="btn btn-info"
            onClick={paginaSiguiente}
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
