import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import styles from "../styles/Sidebar.module.css";

const Sidebar = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <aside className={styles.sidebar}>
      <div>
        <h2>Menú</h2>
        <nav>
          <ul>
            <li><NavLink to="/">Inicio</NavLink></li>
            <li><NavLink to="/tabla">Tabla</NavLink></li>
            <li><NavLink to="/registro">Registro</NavLink></li>
          </ul>
        </nav>

        <div className={styles.themeSwitch} onClick={toggleTheme}>
          <div className={`${styles.toggleCircle} ${isDarkMode ? styles.dark : styles.light}`}>
            {isDarkMode ? "🌙" : "🌞"}
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;