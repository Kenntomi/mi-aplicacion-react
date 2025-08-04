import { useLocalStorage } from "../components/useLocalStorage";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

function Home() {
  const [registros] = useLocalStorage("registros", []);
  const navigate = useNavigate();

  const total = registros.length;

  const edadPromedio =
    total === 0
      ? 0
      : Math.round(
          registros.reduce((sum, r) => sum + r.edad, 0) / registros.length
        );

  const ocupaciones = [...new Set(registros.map((r) => r.ocupacion || "Sin definir"))];

  return (
    <div className="fade-in" style={{ padding: "1rem" }}>
      <h1>Bienvenido</h1>
      <p>Este es tu sistema de registro de personas.</p>

      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
        <div className={styles.card}>
          <h3>Total de personas</h3>
          <p>{total}</p>
        </div>
        <div className={styles.card}>
          <h3>Edad promedio</h3>
          <p>{edadPromedio} años</p>
        </div>
        <div className={styles.card}>
          <h3>Ocupaciones distintas</h3>
          <p>{ocupaciones.length}</p>
        </div>
      </div>

      <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
        <button onClick={() => navigate("/registro")}>Registrar nueva persona</button>
        <button onClick={() => navigate("/tabla")}>Ver tabla</button>
      </div>
    </div>
  );
}

export default Home;