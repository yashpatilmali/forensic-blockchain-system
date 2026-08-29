const hre = require("hardhat");

async function main() {

    const ForensicReport =
        await hre.ethers.getContractFactory("ForensicReport");

    const contract =
        await ForensicReport.deploy();

    await contract.waitForDeployment();

    console.log(
        "Contract deployed to:",
        await contract.getAddress()
    );
}

main().catch((error) => {

    console.error(error);

    process.exitCode = 1;
});