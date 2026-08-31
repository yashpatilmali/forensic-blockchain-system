import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Reports() {

    const [reports, setReports] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    const fetchReports = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/reports");

            setReports(
                response.data.reports || []
            );

        } catch (error) {

            console.error(
                "FETCH REPORTS ERROR:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load reports"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchReports();

    }, []);


    return (

        <div className="app-layout">

            {/* SIDEBAR */}

            <aside className="sidebar">

                <div className="brand">

                    <div className="brand-icon">
                        ◈
                    </div>

                    <div className="brand-name">
                        FORENSIC<span>CHAIN</span>
                    </div>

                </div>


                <nav className="nav">

                    <Link
                        to="/dashboard"
                        className="nav-link"
                    >
                        ◫ <span>Dashboard</span>
                    </Link>


                    <Link
                        to="/reports"
                        className="nav-link active"
                    >
                        ▤ <span>Reports</span>
                    </Link>


                    <Link
                        to="/upload"
                        className="nav-link"
                    >
                        ↑ <span>Upload Report</span>
                    </Link>


                    <Link
                        to="/verify"
                        className="nav-link"
                    >
                        ✓ <span>Verify Report</span>
                    </Link>

                </nav>


                <div className="sidebar-bottom">

                    <button
                        className="logout-btn"
                        onClick={() => {

                            localStorage.removeItem(
                                "token"
                            );

                            window.location.href = "/";

                        }}
                    >
                        ↪ Logout
                    </button>

                </div>

            </aside>


            {/* MAIN */}

            <main className="main-content">

                <div className="topbar">

                    <div>

                        <h1 className="page-title">
                            Forensic Reports
                        </h1>

                        <div className="page-subtitle">
                            Browse registered forensic
                            evidence records.
                        </div>

                    </div>


                    <div className="user-pill">

                        <div className="avatar">
                            Y
                        </div>

                        <span>
                            Authorized User
                        </span>

                    </div>

                </div>


                {/* REPORTS CARD */}

                <div className="card">

                    <div className="card-header">

                        <h2 className="card-title">
                            All Reports
                        </h2>

                        <p className="card-description">

                            {reports.length}
                            {" "}
                            forensic reports registered

                        </p>

                    </div>


                    {/* LOADING */}

                    {loading && (

                        <div
                            style={{
                                padding: "40px",
                                textAlign: "center",
                                color: "#7f8b90"
                            }}
                        >
                            Loading reports...
                        </div>

                    )}


                    {/* ERROR */}

                    {!loading && error && (

                        <div
                            style={{
                                padding: "30px",
                                color: "#f87171"
                            }}
                        >
                            {error}
                        </div>

                    )}


                    {/* EMPTY */}

                    {!loading &&
                    !error &&
                    reports.length === 0 && (

                        <div
                            style={{
                                padding: "50px",
                                textAlign: "center",
                                color: "#7f8b90"
                            }}
                        >

                            <h3>
                                No Reports Found
                            </h3>

                            <p>
                                Register your first
                                forensic report.
                            </p>

                            <Link
                                to="/upload"
                                className="primary-btn"
                                style={{
                                    display: "inline-block",
                                    width: "auto",
                                    textDecoration: "none"
                                }}
                            >
                                Upload Report
                            </Link>

                        </div>

                    )}


                    {/* REPORT LIST */}

                    {!loading &&
                    reports.length > 0 && (

                        <div className="report-list">

                            {reports.map(
                                (report) => (

                                    <div
                                        className="report-row"
                                        key={report._id}
                                    >

                                        {/* REPORT */}

                                        <div>

                                            <div className="report-id">

                                                {report.title}

                                            </div>

                                            <div className="report-case">

                                                Case:
                                                {" "}
                                                {report.caseNumber}

                                            </div>

                                        </div>


                                        {/* ID */}

                                        <div>

                                            <div
                                                className="report-case"
                                            >
                                                REPORT ID
                                            </div>

                                            <div
                                                className="hash-box"
                                                style={{
                                                    marginTop: "5px"
                                                }}
                                            >
                                                {report.reportId}
                                            </div>

                                        </div>


                                        {/* ACTION */}

                                        <div>

                                            <Link
                                                to={`/verify?reportId=${encodeURIComponent(
                                                    report.reportId
                                                )}`}
                                                className="nav-link"
                                                style={{
                                                    justifyContent:
                                                        "center"
                                                }}
                                            >
                                                Verify →
                                            </Link>

                                        </div>

                                    </div>

                                )
                            )}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default Reports;