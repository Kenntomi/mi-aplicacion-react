import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import styles from "./styles/Theme.module.css";
import Sidebar from "./components/Sidebar";
import RegisterView from "./pages/RegisterView";
import TableView from "./pages/TableView";
import Home from "./pages/Home";

function App() {
  const { isDarkMode } = useTheme();

  return (
    <div className={`${styles.app} ${isDarkMode ? styles.dark : ""}`}>
      <Router>
        <Sidebar />
        <main style={{ padding: "1rem", flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tabla" element={<TableView />} />
            <Route path="/registro" element={<RegisterView />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
  
}

export default App;