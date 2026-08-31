const express = require("express");

const router = express.Router();

const {
    createReport,
    verifyReport,
    getReports
} = require("../controllers/reportController");

const protect =
    require("../middleware/authMiddleware");

const upload =
    require("../middleware/uploadMiddleware");


// ==========================================
// GET ALL REPORTS
// ==========================================

router.get(
    "/",
    protect,
    getReports
);


// ==========================================
// CREATE REPORT
// ==========================================

router.post(
    "/",
    protect,
    upload.single("report"),
    createReport
);


// ==========================================
// VERIFY REPORT
// ==========================================

router.post(
    "/verify",
    protect,
    upload.single("report"),
    verifyReport
);


module.exports = router;