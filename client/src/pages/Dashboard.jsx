import { Link } from "react-router-dom";

function Dashboard() {

    const user =
        JSON.parse(
            localStorage.getItem("user")
        );

    return (

        <div>

            <h1>
                Forensic Report Management System
            </h1>

            <h2>
                Welcome, {user?.name || "User"}
            </h2>


            <div>

                <Link to="/upload">
                    <button>
                        Upload Forensic Report
                    </button>
                </Link>


                <Link to="/verify">
                    <button>
                        Verify Forensic Report
                    </button>
                </Link>

            </div>

        </div>
    );
}

export default Dashboard;