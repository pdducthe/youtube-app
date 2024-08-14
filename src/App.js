import "./App.css";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import AuthenticationPage from "./Pages/Authentication";
import CommentPage from "./Pages/Comments";
import ActivityPage from "./Pages/Activities";
import Layout from "./Components/Layout";
import AuthProvider from "./Context/AuthContext";
import PrivateRoute from "./Context/PrivateRoute";
import LocalStorageUtils from "./utils/localStorage.util";
import { handleCallGoogleToken } from "./utils/common";


function App() {
  const isAuthenticated = LocalStorageUtils.getAuthToken();
  const googleToken = LocalStorageUtils.getGoogleAccessToken();

  useEffect(() => {
    if (isAuthenticated && googleToken === '') {
      handleCallGoogleToken();
    } else {
      LocalStorageUtils.clearUserInfo();
    }
  }, []);

  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<AuthenticationPage />}></Route>
            <Route element={<PrivateRoute />}>
              <Route path="/comment" element={<CommentPage />}></Route>
              <Route path="/activity" element={<ActivityPage />}></Route>
            </Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
