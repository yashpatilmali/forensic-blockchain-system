import { useState } from "react";
import api from "../services/api";
import "../App.css";

function UploadReport() {

    const [caseNumber, setCaseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setResult(null);

        if (!caseNumber.trim()) {
            alert("Please enter case number");
            return;
        }

        if (!title.trim()) {
            alert("Please enter report title");
            return;
        }

        if (!file) {
            alert("Please select a PDF");
            return;
        }

        if (file.type !== "application/pdf") {
            alert("Only PDF files are allowed");
            return;
        }

        const formData = new FormData();

        formData.append("caseNumber", caseNumber);
        formData.append("title", title);
        formData.append("report", file);

        try {

            setLoading(true);

            const response =
                await api.post(
                    "/reports",
                    formData
                );

            setResult(response.data);

            setCaseNumber("");
            setTitle("");
            setFile(null);

        } catch (error) {

            console.error(
                "UPLOAD ERROR:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Upload failed"
            );

        } finally {

            setLoading(false);
        }
    };

    return (

        <div className="app-layout">

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

                    <a
                        href="/dashboard"
                        className="nav-link"
                    >
                        ◫ <span>Dashboard</span>
                    </a>

                    <a
                        href="/upload"
                        className="nav-link active"
                    >
                        ↑ <span>Upload Report</span>
                    </a>

                    <a
                        href="/verify"
                        className="nav-link"
                    >
                        ✓ <span>Verify Report</span>
                    </a>

                </nav>


                <div className="sidebar-bottom">

                    <button
                        className="logout-btn"
                        onClick={() => {
                            localStorage.removeItem("token");
                            window.location.href = "/";
                        }}
                    >
                        ↪ Logout
                    </button>

                </div>

            </aside>


            <main className="main-content">

                <div className="topbar">

                    <div>

                        <h1 className="page-title">
                            Register Forensic Report
                        </h1>

                        <div className="page-subtitle">
                            Secure evidence on the blockchain
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


                <div className="card form-card">

                    <div className="card-header">

                        <h2 className="card-title">
                            New Evidence Record
                        </h2>

                        <p className="card-description">
                            Upload a PDF to generate a cryptographic
                            hash and register its integrity on-chain.
                        </p>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        style={{ padding: "24px 0 0" }}
                    >

                        <div className="form-group">

                            <label className="form-label">
                                Case Number
                            </label>

                            <input
                                className="form-input"
                                type="text"
                                placeholder="CASE-2026-001"
                                value={caseNumber}
                                onChange={(e) =>
                                    setCaseNumber(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


                        <div className="form-group">

                            <label className="form-label">
                                Report Title
                            </label>

                            <input
                                className="form-input"
                                type="text"
                                placeholder="Forensic Analysis Report"
                                value={title}
                                onChange={(e) =>
                                    setTitle(
                                        e.target.value
                                    )
                                }
                            />

                        </div>


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
                            />

                        </div>


                        <button
                            className="primary-btn"
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Registering on Blockchain..."
                                : "Register Report"
                            }
                        </button>

                    </form>


                    {result && (

                        <div className="verification-result result-authentic">

                            <div className="result-status">
                                ✓ Report Registered
                            </div>

                            <p>
                                <strong>
                                    Report ID
                                </strong>
                            </p>

                            <div className="hash-box">
                                {result.reportId}
                            </div>

                            {result.fileHash && (

                                <>
                                    <p>
                                        <strong>
                                            SHA-256 File Hash
                                        </strong>
                                    </p>

                                    <div className="hash-box">
                                        {result.fileHash}
                                    </div>
                                </>

                            )}

                            {result.transactionHash && (

                                <>
                                    <p>
                                        <strong>
                                            Blockchain Transaction
                                        </strong>
                                    </p>

                                    <div className="hash-box">
                                        {result.transactionHash}
                                    </div>
                                </>

                            )}

                        </div>

                    )}

                </div>

            </main>

        </div>
    );
}

export default UploadReport;