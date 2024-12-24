import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './index.css';
import 'macro-css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from "./redux/store.js";
import {Provider} from "react-redux";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";
import Login from "./pages/Login/Login.jsx";
import Registration from "./pages/Registration/Registration.jsx";
import Authentication from "./pages/Authentication/Authentication";
import Info from "./components/Info";
import ProtectedRoute from "./components/ProtectedRoute";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <Router>
                <Routes>
                    <Route path="/" element={<App/>}>
                        <Route index element={<Authentication/>}/>
                        <Route path={'/home'} element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        }/>/>
                        <Route path={'/favorites'} element={
                            <ProtectedRoute>
                                <Favorites />
                            </ProtectedRoute>
                        }/>
                        <Route path={'/orders'}  element={
                            <ProtectedRoute>
                                <Orders />
                            </ProtectedRoute>
                        }/>
                        <Route path={'/info'}  element={
                            <ProtectedRoute>
                                <Info />
                            </ProtectedRoute>
                        }/>
                        <Route path={'/login'} element={<Login/>}/>
                        <Route path={'/register'} element={<Registration/>}/>
                    </Route>
                </Routes>
            </Router>
        </React.StrictMode>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
