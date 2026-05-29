import { useTheme } from "./hooks/useTheme.jsx";

function Test() {
  const { isDark, toggle } = useTheme();
  return (
    <div style={{ color: "white", padding: "2rem" }}>
      <h1>Theme: {isDark ? "dark" : "light"}</h1>
      <button onClick={toggle} style={{ color: "white", border: "1px solid white", padding: "8px 16px", cursor: "pointer" }}>
        Toggle
      </button>
    </div>
  );
}

export default function App() {
  return <Test />;
}