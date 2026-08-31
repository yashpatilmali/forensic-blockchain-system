import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UploadReport from "./pages/UploadReport";
import VerifyReport from "./pages/VerifyReport";
import Reports from "./pages/Reports";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                <Route
    path="/reports"
    element={<Reports />}
/>

                <Route
                    path="/"
                    element={<Login />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />

                <Route
                    path="/dashboard"
                    element={<Dashboard />}
                />

                <Route
                    path="/upload"
                    element={<UploadReport />}
                />

                <Route
                    path="/verify"
                    element={<VerifyReport />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;