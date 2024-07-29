import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import { TodoProvider } from './context/TodoContext';
import { AuthProvider} from './context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(  
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <React.StrictMode>
      <AuthProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>
);
