import { useState } from "react";
import api from "../services/api";

function VerifyReport() {

    const [reportId, setReportId] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    const handleVerify = async (e) => {

        e.preventDefault();

        setResult(null);


        // Check Report ID
        if (!reportId.trim()) {

            alert("Please enter Report ID");

            return;
        }


        // Check PDF
        if (!file) {

            alert("Please select the original PDF file");

            return;
        }


        if (file.type !== "application/pdf") {

            alert("Only PDF files are allowed");

            return;
        }


        // Create FormData
        const formData = new FormData();

        formData.append(
            "reportId",
            reportId
        );

        formData.append(
            "report",
            file
        );


        try {

            setLoading(true);


            console.log(
                "Verifying report:",
                reportId
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


            setResult(response.data);


        } catch (error) {

            console.error(
                "VERIFICATION ERROR:",
                error
            );

            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Verification failed"
            );


        } finally {

            setLoading(false);
        }
    };


    return (

        <div className="verify-container">

            <h1>
                Verify Forensic Report
            </h1>


            <p>
                Upload the forensic PDF to verify
                its authenticity and integrity.
            </p>


            <form onSubmit={handleVerify}>

                {/* REPORT ID */}

                <div>

                    <label>
                        Report ID
                    </label>

                    <br />

                    <input
                        type="text"
                        placeholder="Enter Report ID"
                        value={reportId}
                        onChange={(e) =>
                            setReportId(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>


                <br />


                {/* PDF */}

                <div>

                    <label>
                        Select Forensic PDF
                    </label>

                    <br />

                    <input
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


                <br />


                {/* BUTTON */}

                <button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Verifying..."
                        : "Verify Report"
                    }

                </button>

            </form>


            {/* VERIFICATION RESULT */}

            {result && (

                <div>

                    <h2>
                        Verification Result
                    </h2>


                    <p>

                        <strong>
                            Report ID:
                        </strong>

                        {" "}

                        {result.reportId}

                    </p>


                    <p>

                        <strong>
                            Uploaded File Hash:
                        </strong>

                        <br />

                        {result.uploadedFileHash}

                    </p>


                    <p>

                        <strong>
                            Original File Hash:
                        </strong>

                        <br />

                        {result.originalHash}

                    </p>


                    <p>

                        <strong>
                            Blockchain Verified:
                        </strong>

                        {" "}

                        {result.blockchainVerified
                            ? "YES"
                            : "NO"
                        }

                    </p>


                    <h3>

                        Status:

                        {" "}

                        {result.status}

                    </h3>


                </div>

            )}

        </div>
    );
}

export default VerifyReport;