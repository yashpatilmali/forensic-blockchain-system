const { ethers } = require("ethers");

require("dotenv").config();


// ======================================================
// CONNECT TO LOCAL BLOCKCHAIN
// ======================================================

const provider =
    new ethers.JsonRpcProvider(
        process.env.BLOCKCHAIN_RPC_URL
    );


// ======================================================
// BLOCKCHAIN WALLET
// ======================================================

const wallet =
    new ethers.Wallet(
        process.env.BLOCKCHAIN_PRIVATE_KEY,
        provider
    );


// ======================================================
// SMART CONTRACT ABI
// ======================================================

const contractABI = [

    "function registerReport(string memory _reportId, string memory _reportHash) public",

    "function getReport(string memory _reportId) public view returns (string memory, string memory, uint256, address)",

    "function verifyReport(string memory _reportId, string memory _reportHash) public view returns (bool)"
];


// ======================================================
// SMART CONTRACT
// ======================================================

const contract =
    new ethers.Contract(
        process.env.CONTRACT_ADDRESS,
        contractABI,
        wallet
    );


// ======================================================
// EXPORT
// ======================================================

module.exports = {

    provider,

    wallet,

    contract
};