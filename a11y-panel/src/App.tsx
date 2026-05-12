import A11yPanel from "./components/A11yPanel/A11yPanel";

function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f8fafc",
        padding: "60px 20px",
        fontFamily: "'Inter', sans-serif",
        color: "#1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          backgroundColor: "#ffffff",
          padding: "48px",
          borderRadius: "24px",
          boxShadow: "0 10px 40px -10px rgba(0,0,0,0.05)",
        }}
      >
        <header
          style={{
            borderBottom: "1px solid #e2e8f0",
            paddingBottom: "24px",
            marginBottom: "32px",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              fontWeight: "800",
              margin: "0 0 12px 0",
              letterSpacing: "-0.02em",
            }}
          >
            Доступність{" "}
            <span style={{ color: "#3b82f6" }}>без компромісів</span>.
          </h1>
          <p
            style={{
              fontSize: "1.125rem",
              color: "#64748b",
              margin: 0,
              lineHeight: 1.6,
            }}
          >
            Це демонстраційна сторінка преміального віджета доступності.
            Натисніть на іконку в правому нижньому куті, щоб протестувати
            функціонал.
          </p>
        </header>

        <main>
          <section style={{ marginBottom: "40px" }}>
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: "700",
                marginBottom: "16px",
              }}
            >
              Як це працює?
            </h2>
            <p
              style={{
                lineHeight: 1.7,
                marginBottom: "16px",
                color: "#334155",
              }}
            >
              Завдяки правильній архітектурі CSS-змінних та React-станів, віджет{" "}
              <a href="#">плавно та безшовно</a> змінює відображення сторінки.
              Він не ламає існуючий дизайн, а акуратно його адаптує.
            </p>
          </section>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "24px",
            }}
          >
            <div
              style={{
                padding: "24px",
                backgroundColor: "#f1f5f9",
                borderRadius: "16px",
              }}
            >
              <h3 style={{ marginTop: 0, fontSize: "1.1rem" }}>
                Тест контрасту
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#475569" }}>
                Увімкніть режим "Контраст" або "Монохром" у панелі, щоб
                побачити, як цей блок адаптується для людей із порушенням зору.
              </p>
            </div>
            <div
              style={{
                padding: "24px",
                backgroundColor: "#eff6ff",
                borderRadius: "16px",
                border: "1px solid #bfdbfe",
              }}
            >
              <h3
                style={{ marginTop: 0, fontSize: "1.1rem", color: "#1d4ed8" }}
              >
                Тест розміру
              </h3>
              <p style={{ fontSize: "0.95rem", color: "#1e3a8a" }}>
                Спробуйте збільшити розмір шрифту. Верстка не повинна
                "зламатися", оскільки використовуються відносні одиниці виміру.
              </p>
            </div>
          </div>
        </main>
      </div>

      <A11yPanel />
    </div>
  );
}

export default App;
