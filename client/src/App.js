import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import NavBar from "./components/Navbar";
import AdminDashboard from "./components/AdminDashboard";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./styles/dashboard.css";
import "./styles/app.css";
import LoadingSpinner from "./components/LoadingSpinner"

function App() {
  const { isAuth, isAdmin, level, loading } = useSelector(
    (state) => state.auth
  );
  const [status, setStatus] = useState(0);

  return (
    <div className="App">
      <NavBar
        isAdmin={isAdmin}
        status={status}
        setStatus={setStatus}
        isAuth={isAuth}
      />
      {loading ? (
        <LoadingSpinner />
      ) : isAuth ? (
        isAdmin ? (
          <AdminDashboard setStatus={setStatus} status={status} isAdmin />
        ) : (
          <Dashboard
            status={status}
            setStatus={setStatus}
            initialLevel={level}
          />
        )
      ) : (
        <Register />
      )}
    </div>
  );
}

export default App;
