import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("officer");

    const [loading, setLoading] = useState(false);


    const handleRegister = async (e) => {

        e.preventDefault();

        setLoading(true);

        try {

            const response = await api.post(
                "/auth/register",
                {
                    name,
                    email,
                    password,
                    role
                }
            );

            alert(
                response.data.message ||
                "Registration successful"
            );

            // Go to login page
            navigate("/login");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="register-container">

            <h1>
                Forensic Report Management System
            </h1>

            <h2>
                Create Account
            </h2>


            <form onSubmit={handleRegister}>

                {/* NAME */}

                <div>
                    <label>
                        Full Name
                    </label>

                    <input
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        required
                    />
                </div>


                {/* EMAIL */}

                <div>
                    <label>
                        Email
                    </label>

                    <input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />
                </div>


                {/* PASSWORD */}

                <div>
                    <label>
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                        minLength={6}
                    />
                </div>


                {/* ROLE */}

                <div>
                    <label>
                        Role
                    </label>

                    <select
                        value={role}
                        onChange={(e) =>
                            setRole(e.target.value)
                        }
                    >

                        <option value="officer">
                            Forensic Officer
                        </option>

                        <option value="investigator">
                            Investigator
                        </option>

                    </select>
                </div>


                {/* REGISTER BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Creating Account..."
                        : "Register"
                    }

                </button>

            </form>


            {/* LOGIN LINK */}

            <p>

                Already have an account?

                {" "}

                <Link to="/login">
                    Login
                </Link>

            </p>

        </div>
    );
}

export default Register;