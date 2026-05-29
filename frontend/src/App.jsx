import { useState, useEffect } from "react";

const API_URL = "/api/todos";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTodos = async () => {
    try {
      setError(null);
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setTodos(data);
    } catch (err) {
      setError(`Не вдалося завантажити задачі: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const createTodo = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    try {
      setError(null);
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const created = await response.json();
      setTodos([created, ...todos]);
      setNewTitle("");
    } catch (err) {
      setError(`Не вдалося створити задачу: ${err.message}`);
    }
  };

  const toggleTodo = async (todo) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${todo.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const updated = await response.json();
      setTodos(todos.map((t) => (t.id === updated.id ? updated : t)));
    } catch (err) {
      setError(`Не вдалося оновити задачу: ${err.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      setError(null);
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      setTodos(todos.filter((t) => t.id !== id));
    } catch (err) {
      setError(`Не вдалося видалити задачу: ${err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>

      {error && <div style={styles.error}>{error}</div>}

      <form onSubmit={createTodo} style={styles.form}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Нова задача..."
          style={styles.input}
        />
        <button type="submit" style={styles.addButton}>
          Додати
        </button>
      </form>

      {loading ? (
        <p style={styles.info}>Завантаження...</p>
      ) : todos.length === 0 ? (
        <p style={styles.info}>Задач поки немає. Додайте першу!</p>
      ) : (
        <ul style={styles.list}>
          {todos.map((todo) => (
            <li key={todo.id} style={styles.item}>
              <label style={styles.label}>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo)}
                  style={styles.checkbox}
                />
                <span
                  style={{
                    ...styles.text,
                    textDecoration: todo.completed ? "line-through" : "none",
                    color: todo.completed ? "#94a3b8" : "#1e293b",
                  }}
                >
                  {todo.title}
                </span>
              </label>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={styles.deleteButton}
              >
                Видалити
              </button>
            </li>
          ))}
        </ul>
      )}

      <footer style={styles.footer}>
        Всього задач: {todos.length} | Виконано:{" "}
        {todos.filter((t) => t.completed).length}
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 600,
    margin: "40px auto",
    padding: "0 20px",
    fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    color: "#1e293b",
    marginBottom: 24,
  },
  error: {
    background: "#fef2f2",
    border: "1px solid #fca5a5",
    color: "#dc2626",
    padding: "12px 16px",
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 14,
  },
  form: {
    display: "flex",
    gap: 8,
    marginBottom: 24,
  },
  input: {
    flex: 1,
    padding: "10px 14px",
    fontSize: 16,
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    outline: "none",
  },
  addButton: {
    padding: "10px 20px",
    fontSize: 16,
    background: "#0891b2",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
  },
  list: {
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  item: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #e2e8f0",
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    cursor: "pointer",
    flex: 1,
  },
  checkbox: {
    width: 18,
    height: 18,
    cursor: "pointer",
  },
  text: {
    fontSize: 16,
  },
  deleteButton: {
    padding: "6px 12px",
    fontSize: 13,
    background: "transparent",
    color: "#ef4444",
    border: "1px solid #fca5a5",
    borderRadius: 6,
    cursor: "pointer",
  },
  info: {
    color: "#64748b",
    fontSize: 16,
    textAlign: "center",
    padding: 40,
  },
  footer: {
    marginTop: 24,
    padding: "16px 0",
    borderTop: "1px solid #e2e8f0",
    color: "#94a3b8",
    fontSize: 14,
    textAlign: "center",
  },
};
