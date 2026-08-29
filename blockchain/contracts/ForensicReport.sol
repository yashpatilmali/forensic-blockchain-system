// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract ForensicReport {

    struct Report {

        string reportId;

        string reportHash;

        uint256 timestamp;

        address uploadedBy;

        bool exists;
    }


    mapping(
        string => Report
    ) private reports;


    event ReportRegistered(

        string reportId,

        string reportHash,

        uint256 timestamp,

        address uploadedBy
    );


    // ==================================================
    // REGISTER REPORT
    // ==================================================

    function registerReport(
        string memory _reportId,
        string memory _reportHash
    )
        public
    {

        require(
            !reports[_reportId].exists,
            "Report already exists"
        );


        reports[_reportId] =
            Report({

                reportId:
                    _reportId,

                reportHash:
                    _reportHash,

                timestamp:
                    block.timestamp,

                uploadedBy:
                    msg.sender,

                exists:
                    true
            });


        emit ReportRegistered(

            _reportId,

            _reportHash,

            block.timestamp,

            msg.sender
        );
    }


    // ==================================================
    // GET REPORT
    // ==================================================

    function getReport(
        string memory _reportId
    )
        public
        view
        returns (
            string memory,
            string memory,
            uint256,
            address
        )
    {

        require(
            reports[_reportId].exists,
            "Report does not exist"
        );


        Report memory report =
            reports[_reportId];


        return (

            report.reportId,

            report.reportHash,

            report.timestamp,

            report.uploadedBy
        );
    }


    // ==================================================
    // VERIFY REPORT
    // ==================================================

    function verifyReport(
        string memory _reportId,
        string memory _reportHash
    )
        public
        view
        returns (bool)
    {

        require(
            reports[_reportId].exists,
            "Report does not exist"
        );


        return keccak256(
            bytes(
                reports[_reportId].reportHash
            )
        )
        ==
        keccak256(
            bytes(
                _reportHash
            )
        );
    }
}