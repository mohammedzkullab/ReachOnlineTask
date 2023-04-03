import useAuth from "hooks/useAuth";
import Dashboard from "pages/dashboard";
import LoginPage from "pages/login";

function App() {
  const auth = useAuth();
  return (
    <div className="bg-gray-light">
      {!auth.isLoggedIn ? <LoginPage /> : <Dashboard />}
    </div>
  );
}

export default App;
