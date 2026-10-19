const hre = require("hardhat");
const fs = require("fs");
const path = require("path");

async function main() {

    console.log("Deploying ForensicReport...");

    const ForensicReport =
        await hre.ethers.getContractFactory(
            "ForensicReport"
        );

    const contract =
        await ForensicReport.deploy();

    await contract.waitForDeployment();

    const address =
        await contract.getAddress();

    console.log(
        "ForensicReport deployed to:",
        address
    );


    // ================================
    // UPDATE SERVER .ENV AUTOMATICALLY
    // ================================

    const envPath =
        path.join(
            __dirname,
            "../../server/.env"
        );


    let env = "";

    if (fs.existsSync(envPath)) {

        env =
            fs.readFileSync(
                envPath,
                "utf8"
            );

    }


    if (env.includes("CONTRACT_ADDRESS=")) {

        env =
            env.replace(
                /CONTRACT_ADDRESS=.*/,
                `CONTRACT_ADDRESS=${address}`
            );

    } else {

        env +=
            `\nCONTRACT_ADDRESS=${address}\n`;

    }


    fs.writeFileSync(
        envPath,
        env
    );


    console.log(
        "CONTRACT_ADDRESS updated automatically in server/.env"
    );

}

main()
    .then(() => process.exit(0))
    .catch((error) => {

        console.error(error);

        process.exit(1);

    });