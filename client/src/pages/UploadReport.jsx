import { useState } from "react";
import api from "../services/api";

function UploadReport() {

    const [caseNumber, setCaseNumber] = useState("");
    const [title, setTitle] = useState("");
    const [file, setFile] = useState(null);

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);


    const handleSubmit = async (e) => {

        e.preventDefault();

        setResult(null);


        // Validate case number
        if (!caseNumber.trim()) {

            alert("Please enter case number");

            return;
        }


        // Validate title
        if (!title.trim()) {

            alert("Please enter report title");

            return;
        }


        // Validate file
        if (!file) {

            alert("Please select a PDF file");

            return;
        }


        if (file.type !== "application/pdf") {

            alert("Only PDF files are allowed");

            return;
        }


        // Create FormData
        const formData = new FormData();

        formData.append(
            "caseNumber",
            caseNumber
        );

        formData.append(
            "title",
            title
        );

        formData.append(
            "report",
            file
        );


        try {

            setLoading(true);

            console.log(
                "Uploading report..."
            );

            console.log(
                "Case Number:",
                caseNumber
            );

            console.log(
                "Title:",
                title
            );

            console.log(
                "File:",
                file.name
            );


            const response =
                await api.post(
                    "/reports",
                    formData
                );


            console.log(
                "Upload response:",
                response.data
            );


            setResult(response.data);


            alert(
                "Forensic report registered successfully!"
            );


            // Clear form
            setCaseNumber("");
            setTitle("");
            setFile(null);


        } catch (error) {

            console.error(
                "UPLOAD ERROR:",
                error
            );


            console.error(
                "BACKEND RESPONSE:",
                error.response?.data
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

        <div className="upload-container">

            <h1>
                Upload Forensic Report
            </h1>


            <form onSubmit={handleSubmit}>

                {/* CASE NUMBER */}

                <div>

                    <label>
                        Case Number
                    </label>

                    <br />

                    <input
                        type="text"
                        placeholder="Enter case number"
                        value={caseNumber}
                        onChange={(e) =>
                            setCaseNumber(
                                e.target.value
                            )
                        }
                        required
                    />

                </div>


                <br />


                {/* TITLE */}

                <div>

                    <label>
                        Report Title
                    </label>

                    <br />

                    <input
                        type="text"
                        placeholder="Enter report title"
                        value={title}
                        onChange={(e) =>
                            setTitle(
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
                        ? "Registering Report..."
                        : "Register Report"
                    }

                </button>

            </form>


            {/* RESULT */}

            {result && (

                <div>

                    <h2>
                        Report Registered Successfully
                    </h2>


                    {result.reportId && (

                        <p>
                            <strong>
                                Report ID:
                            </strong>

                            {" "}

                            {result.reportId}
                        </p>
                    )}


                    {result.caseNumber && (

                        <p>
                            <strong>
                                Case Number:
                            </strong>

                            {" "}

                            {result.caseNumber}
                        </p>
                    )}


                    {result.title && (

                        <p>
                            <strong>
                                Title:
                            </strong>

                            {" "}

                            {result.title}
                        </p>
                    )}


                    {result.fileHash && (

                        <p>
                            <strong>
                                File Hash:
                            </strong>

                            {" "}

                            {result.fileHash}
                        </p>
                    )}


                    {result.transactionHash && (

                        <p>
                            <strong>
                                Blockchain Transaction:
                            </strong>

                            {" "}

                            {result.transactionHash}
                        </p>
                    )}

                </div>
            )}

        </div>
    );
}

export default UploadReport;