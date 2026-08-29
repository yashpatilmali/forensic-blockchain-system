const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
    {
        reportId: {
            type: String,
            required: true,
            unique: true
        },

        caseNumber: {
            type: String,
            required: true
        },

        title: {
            type: String,
            required: true
        },

        description: {
            type: String
        },

        fileName: {
            type: String,
            required: true
        },

        filePath: {
            type: String,
            required: true
        },

        fileHash: {
            type: String,
            required: true
        },

        blockchainTxHash: {
            type: String
        },

        uploadedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        status: {
            type: String,

            enum: [
                "REGISTERED",
                "VERIFIED",
                "TAMPERED"
            ],

            default: "REGISTERED"
        }
    },

    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Report",
        reportSchema
    );