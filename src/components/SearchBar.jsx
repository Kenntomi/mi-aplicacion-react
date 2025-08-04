function SearchBar({ filtro, setFiltro }) {
  return (
    <input
      type="text"
      placeholder="Buscar por nombre, apellido, fecha o ocupación..."
      value={filtro}
      onChange={(e) => setFiltro(e.target.value)}
      style={{
        width: "100%",
        padding: "0.5rem",
        marginBottom: "1rem",
        fontSize: "1rem",
        borderRadius: "6px",
        border: "1px solid #ccc"
      }}
    />
  );
}

export default SearchBar;