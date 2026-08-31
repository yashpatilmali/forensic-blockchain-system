import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function VerifyReport() {

    const [searchParams] = useSearchParams();

    // Get Report ID from URL if available
    const initialReportId =
        searchParams.get("reportId") || "";

    const [reportId, setReportId] =
        useState(initialReportId);

    const [file, setFile] =
        useState(null);

    const [loading, setLoading] =
        useState(false);

    const [result, setResult] =
        useState(null);


    const handleVerify = async (e) => {

        e.preventDefault();

        setResult(null);


        if (!reportId.trim()) {

            alert("Please enter Report ID");

            return;
        }


        if (!file) {

            alert("Please select forensic PDF");

            return;
        }


        if (file.type !== "application/pdf") {

            alert("Only PDF files are allowed");

            return;
        }


        const formData = new FormData();


        formData.append(
            "reportId",
            reportId.trim()
        );


        formData.append(
            "report",
            file
        );


        try {

            setLoading(true);


            console.log(
                "Verifying Report ID:",
                reportId
            );

            console.log(
                "Selected PDF:",
                file.name
            );


            const response =
                await api.post(
                    "/reports/verify",
                    formData
                );


            console.log(
                "Verification response:",
                response.data
            );


            setResult(
                response.data
            );


        } catch (error) {

            console.error(
                "VERIFY ERROR:",
                error
            );


            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to verify report"
            );


        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="app-layout">


            {/* =========================
                SIDEBAR
            ========================= */}

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
                        className="nav-link"
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
                        className="nav-link active"
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


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <main className="main-content">


                <div className="topbar">


                    <div>

                        <h1 className="page-title">
                            Verify Evidence
                        </h1>

                        <div className="page-subtitle">
                            Verify forensic report integrity
                            against blockchain records.
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


                {/* =========================
                    VERIFY CARD
                ========================= */}

                <div className="card form-card">


                    <div className="card-header">

                        <h2 className="card-title">
                            Evidence Verification
                        </h2>

                        <p className="card-description">
                            Upload the forensic PDF to
                            verify its authenticity and
                            integrity.
                        </p>

                    </div>


                    <form
                        onSubmit={handleVerify}
                        style={{
                            paddingTop: "24px"
                        }}
                    >


                        {/* REPORT ID */}

                        <div className="form-group">

                            <label className="form-label">
                                Report ID
                            </label>


                            <input
                                className="form-input"
                                type="text"
                                placeholder="FR-1788021775904"
                                value={reportId}
                                onChange={(e) =>
                                    setReportId(
                                        e.target.value
                                    )
                                }
                                required
                            />


                        </div>


                        {/* PDF */}

                        <div className="form-group">

                            <label className="form-label">
                                Forensic PDF
                            </label>


                            <input
                                className="file-input"
                                type="file"
                                accept=".pdf,application/pdf"
                                onChange={(e) =>
                                    setFile(
                                        e.target.files[0]
                                    )
                                }
                                required
                            />


                        </div>


                        {/* BUTTON */}

                        <button
                            className="primary-btn"
                            type="submit"
                            disabled={loading}
                        >

                            {loading
                                ? "Verifying..."
                                : "Verify Report"
                            }

                        </button>


                    </form>


                    {/* =========================
                        RESULT
                    ========================= */}

                    {result && (

                        <div
                            className={`verification-result ${
                                result.status === "AUTHENTIC"
                                    ? "result-authentic"
                                    : "result-tampered"
                            }`}
                        >


                            {/* STATUS */}

                            <div className="result-status">

                                {result.status === "AUTHENTIC"
                                    ? "✓ AUTHENTIC"
                                    : "⚠ TAMPERED"
                                }

                            </div>


                            {/* REPORT ID */}

                            <p>
                                <strong>
                                    Report ID
                                </strong>
                            </p>


                            <div className="hash-box">

                                {result.reportId}

                            </div>


                            {/* REPORT NAME */}

                            {result.title && (

                                <>

                                    <p>
                                        <strong>
                                            Report Name
                                        </strong>
                                    </p>


                                    <div className="hash-box">

                                        {result.title}

                                    </div>

                                </>

                            )}


                            {/* CASE NUMBER */}

                            {result.caseNumber && (

                                <>

                                    <p>
                                        <strong>
                                            Case Number
                                        </strong>
                                    </p>


                                    <div className="hash-box">

                                        {result.caseNumber}

                                    </div>

                                </>

                            )}


                            {/* FILE HASH */}

                            <p>
                                <strong>
                                    Uploaded File Hash
                                </strong>
                            </p>


                            <div className="hash-box">

                                {result.uploadedFileHash}

                            </div>


                            {/* ORIGINAL HASH */}

                            <p>
                                <strong>
                                    Original File Hash
                                </strong>
                            </p>


                            <div className="hash-box">

                                {result.originalHash}

                            </div>


                            {/* BLOCKCHAIN */}

                            <p>

                                <strong>
                                    Blockchain Verification:
                                </strong>

                                {" "}

                                {result.blockchainVerified
                                    ? "✓ Confirmed"
                                    : "✕ Failed"
                                }

                            </p>


                        </div>

                    )}


                </div>


            </main>


        </div>
    );
}


export default VerifyReport;