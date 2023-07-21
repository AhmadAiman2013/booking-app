import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import { AuthProvider } from "./components/AuthProvider";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  return (
    <AuthProvider>
      <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/main/:userID" element={<MainPage />} />
          <Route path="/login" element={<AuthPage />} />
          <Route path="*" element={<AuthPage />} />
        </Routes>
      </BrowserRouter>
      </Provider>
    </AuthProvider>
  );
}

export default App;

