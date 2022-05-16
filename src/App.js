import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";

import About from "./Pages/About/About";
import RequireAuth from "./Pages/Login/RequireAuth";
import AppointmentPage from "./Pages/Appointment/AppointmentPage";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import SingUp from "./Pages/Login/SingUp";
import Footer from "./Pages/Shared/Footer";
import Navbar from "./Pages/Shared/Navbar";

function App() {
    return (
        <div>
            <Navbar></Navbar>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route
                    path="appointment"
                    element={
                        <RequireAuth>
                            <AppointmentPage />
                        </RequireAuth>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SingUp />} />
            </Routes>
            <Footer></Footer>
            <Toaster position="top-center" reverseOrder={false} />
        </div>
    );
}

export default App;
