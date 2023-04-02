import useAuth from "hooks/useAuth";
import LoginPage from "pages/login";

function App() {
  const auth = useAuth();
  return (
    <div className="App">
      {!auth.isLoggedIn ? <LoginPage /> : <h1>sssssss</h1>}
    </div>
  );
}

export default App;
