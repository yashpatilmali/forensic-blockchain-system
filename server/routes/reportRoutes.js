const express = require("express");

const upload =
    require("../middleware/uploadMiddleware");

const protect =
    require("../middleware/authMiddleware");

const {
    createReport,
    verifyReport
} = require("../controllers/reportController");


const router = express.Router();


// ======================================================
// CREATE / REGISTER REPORT
// POST /api/reports
// ======================================================

router.post(
    "/",
    protect,
    upload.single("report"),
    createReport
);


// ======================================================
// VERIFY REPORT
// POST /api/reports/verify
// ======================================================

router.post(
    "/verify",
    protect,
    upload.single("report"),
    verifyReport
);


module.exports = router;