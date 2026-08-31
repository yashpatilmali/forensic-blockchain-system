const Report = require("../models/Report");

const hashFile = require("../utils/hashFile");
const generateReportId = require("../utils/generateReportId");

const { contract } = require("../config/blockchain");


const getReports = async (req, res) => {

    try {

        const reports = await Report.find()
            .sort({ createdAt: -1 })
            .select(
                "reportId caseNumber title fileName createdAt"
            );

        res.status(200).json({

            count: reports.length,

            reports

        });

    } catch (error) {

        console.error(
            "GET REPORTS ERROR:",
            error
        );

        res.status(500).json({

            message:
                "Failed to fetch reports"

        });

    }
};


// ======================================================
// CREATE / REGISTER FORENSIC REPORT
// ======================================================

const createReport = async (req, res) => {

    try {

        // Check whether PDF was uploaded
        if (!req.file) {

            return res.status(400).json({
                message: "PDF file is required"
            });
        }


        // Get report information from frontend
        const {
            caseNumber,
            title,
            description
        } = req.body;


        // Validate required fields
        if (!caseNumber || !title) {

            return res.status(400).json({
                message: "Case number and title are required"
            });
        }


        // Generate unique report ID
        const reportId = generateReportId();


        // Generate SHA-256 hash of PDF
        const fileHash = hashFile(req.file.path);


        console.log("================================");
        console.log("New Forensic Report");
        console.log("Report ID:", reportId);
        console.log("File Hash:", fileHash);
        console.log("================================");


        // ==================================================
        // REGISTER REPORT HASH ON BLOCKCHAIN
        // ==================================================

        const transaction =
            await contract.registerReport(
                reportId,
                fileHash
            );


        console.log(
            "Blockchain transaction sent:",
            transaction.hash
        );


        // Wait for blockchain confirmation
        await transaction.wait();


        console.log(
            "Blockchain transaction confirmed"
        );


        // ==================================================
        // SAVE REPORT INFORMATION IN MONGODB
        // ==================================================

        const report = await Report.create({

            reportId,

            caseNumber,

            title,

            description,

            fileName:
                req.file.originalname,

            filePath:
                req.file.path,

            fileHash,

            blockchainTxHash:
                transaction.hash,

            uploadedBy:
                req.user.id,

            status:
                "REGISTERED"
        });


        // Send response to frontend
        res.status(201).json({

            message:
                "Forensic report registered successfully",

            report: {

                id: report._id,

                reportId:
                    report.reportId,

                caseNumber:
                    report.caseNumber,

                title:
                    report.title,

                description:
                    report.description,

                fileName:
                    report.fileName,

                fileHash:
                    report.fileHash,

                blockchainTxHash:
                    report.blockchainTxHash,

                status:
                    report.status,

                createdAt:
                    report.createdAt
            }
        });


    } catch (error) {

        console.error(
            "Create Report Error:",
            error
        );


        res.status(500).json({

            message:
                "Failed to register forensic report",

            error:
                error.message
        });
    }
};



// ======================================================
// VERIFY FORENSIC REPORT
// ======================================================

const verifyReport = async (req, res) => {

    try {

        const { reportId } = req.body;

        console.log("VERIFY REQUEST");
        console.log("Report ID:", reportId);
        console.log("File:", req.file);


        if (!req.file) {

            return res.status(400).json({
                message: "PDF file is required"
            });
        }


        const report =
            await Report.findOne({
                reportId: reportId
            });


        console.log(
            "MongoDB Report:",
            report
        );


        if (!report) {

            return res.status(404).json({
                message: "Report not found"
            });
        }


        const uploadedFileHash =
            hashFile(req.file.path);


        console.log(
            "Uploaded File Hash:",
            uploadedFileHash
        );


        console.log(
            "Original File Hash:",
            report.fileHash
        );


        const blockchainResult =
            await contract.verifyReport(
                reportId,
                uploadedFileHash
            );


        console.log(
            "Blockchain Result:",
            blockchainResult
        );


        res.json({

            reportId: reportId,

            uploadedFileHash:

                uploadedFileHash,

            originalHash:

                report.fileHash,

            blockchainVerified:

                blockchainResult,

            status:

                blockchainResult
                    ? "AUTHENTIC"
                    : "TAMPERED"

        });


    } catch (error) {

        console.error(
            "VERIFY REPORT ERROR:",
            error
        );

        console.error(
            "ERROR MESSAGE:",
            error.message
        );

        console.error(
            "ERROR STACK:",
            error.stack
        );


        res.status(500).json({

            message:
                error.message ||
                "Failed to verify report"

        });

    }
};



// ======================================================
// EXPORT FUNCTIONS
// ======================================================

module.exports = {
    createReport,
    verifyReport,
    getReports
};