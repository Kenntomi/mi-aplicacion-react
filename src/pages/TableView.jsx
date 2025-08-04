import { useState } from "react";
import { useLocalStorage } from "../components/useLocalStorage";
import FormModal from "../components/FormModal";
import SearchBar from "../components/SearchBar";

function TableView() {
  const [registros, setRegistros] = useLocalStorage("registros", []);
  const [filtro, setFiltro] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);
  const [registroEditando, setRegistroEditando] = useState(null);

  const datosFiltrados = registros.filter((r) =>
    `${r.nombre} ${r.apellido} ${r.fechaNacimiento} ${r.ocupacion}`
      .toLowerCase()
      .includes(filtro.toLowerCase())
  );

  const handleEliminar = (id) => {
    const confirmar = window.confirm("¿Eliminar este registro?");
    if (confirmar) {
      const actualizados = registros.filter((r) => r.id !== id);
      setRegistros(actualizados);
    }
  };

  const handleEditar = (registro) => {
    setRegistroEditando(registro);
    setModalAbierto(true);
  };

  const handleActualizar = (datoActualizado) => {
    const actualizados = registros.map((r) =>
      r.id === datoActualizado.id ? datoActualizado : r
    );
    setRegistros(actualizados);
    setModalAbierto(false);
    setRegistroEditando(null);
  };

  return (
    <div className="fade-in" style={{ padding: "1rem" }}>
      <h1>Vista de la tabla</h1>

      <SearchBar filtro={filtro} setFiltro={setFiltro} />

      <table border="1" cellPadding="10" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha de Nacimiento</th>
            <th>Edad</th>
            <th>Ocupación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {datosFiltrados.length === 0 ? (
            <tr>
              <td colSpan="6" style={{ textAlign: "center" }}>No hay coincidencias</td>
            </tr>
          ) : (
            datosFiltrados.map((dato) => (
              <tr key={dato.id}>
                <td>{dato.nombre}</td>
                <td>{dato.apellido}</td>
                <td>{dato.fechaNacimiento}</td>
                <td>{dato.edad}</td>
                <td>{dato.ocupacion}</td>
                <td>
                  <button onClick={() => handleEditar(dato)} style={{ marginRight: "5px" }}>Editar</button>
                  <button onClick={() => handleEliminar(dato.id)}>Eliminar</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <FormModal
        isOpen={modalAbierto}
        onClose={() => {
          setModalAbierto(false);
          setRegistroEditando(null);
        }}
        onSubmit={handleActualizar}
        initialData={registroEditando}
      />
    </div>
  );
}

export default TableView;