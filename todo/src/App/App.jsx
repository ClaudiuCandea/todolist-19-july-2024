import "../App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import TodoListPage from "../pages/ToDo/List/ListPage";
import TodoUpdatePage from "../pages/ToDo/Update/UpdatePage";
import TodoCreatePage from "../pages/ToDo/Create/CreatePage";
import { Toaster } from "react-hot-toast";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/Login/GoogleLogin";
import { useAuth } from "../Hooks/useAuth";
import { routesCfg } from "../routes/routes";
import Navbar from "../components/Navbar";
import Profile from "../components/Profile";
import { useMemo } from "react";
import PublicTodoListPage from "../pages/ToDo/List/PublicListPage";

const ConditionalNavbar = () => {
  const location = useLocation();
  const routes = useMemo(() => {
    return routesCfg;
  }, []);
  const profile = JSON.parse(localStorage.getItem("profile"));

  return location.pathname !== "/login" ? (
    <Navbar
      anchorList={routes}
      profileComponent={
        profile ? (
          <Profile
            picture={profile.picture}
            name={profile.name}
            mail={profile.email}
          />
        ) : (
          <Profile />
        )
      }
    />
  ) : null;
};

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Router>
        <ConditionalNavbar />
        <Routes>
          <Route
            path="/login"
            element={!isAuthenticated ? <LoginPage /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={
              isAuthenticated ? <Home paths={[]} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/todo"
            element={
              isAuthenticated ? <TodoListPage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/todo/:id"
            element={
              isAuthenticated ? <TodoUpdatePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/todo/create"
            element={
              isAuthenticated ? <TodoCreatePage /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/todo/public"
            element={
              isAuthenticated ? (
                <PublicTodoListPage />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={
              !isAuthenticated ? (
                <Navigate to="/login" />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
        </Routes>
        <Toaster />
      </Router>
    </>
  );
}

export default App;
