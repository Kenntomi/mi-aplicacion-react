import { useState } from "react";
import FormModal from "../components/FormModal";
import { useLocalStorage } from "../components/useLocalStorage";
import { useNavigate } from "react-router-dom";

function RegisterView() {
  const [showModal, setShowModal] = useState(false);
  const [registros, setRegistros] = useLocalStorage("registros", []);
  const navigate = useNavigate();

  const handleRegistrar = (nuevoDato) => {
    setRegistros([...registros, nuevoDato]);
  };

  const handleVaciar = () => {
    const confirmar = window.confirm("¿Seguro que deseas eliminar todos los registros?");
    if (confirmar) setRegistros([]);
  };

  return (
    <div className="fade-in" style={{ padding: "1rem" }}>
      <h1>Registrar persona</h1>
      <p>Actualmente hay <strong>{registros.length}</strong> personas registradas.</p>

      <button onClick={() => setShowModal(true)} style={{ marginRight: "1rem" }}>
        Registrar nueva persona
      </button>
      <button onClick={() => navigate("/tabla")} style={{ marginRight: "1rem" }}>
        Ver tabla
      </button>
      <button onClick={handleVaciar}>
        Vaciar registros
      </button>

      {registros.length > 0 && (
        <div style={{ marginTop: "2rem" }}>
          <h3>Últimos registros:</h3>
          <ul>
            {registros.slice(-3).reverse().map((r) => (
              <li key={r.id}>
                {r.nombre} {r.apellido} ({r.edad} años)
              </li>
            ))}
          </ul>
        </div>
      )}

      <FormModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleRegistrar}
      />
    </div>
  );
}

export default RegisterView;