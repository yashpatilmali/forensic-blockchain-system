const generateReportId = () => {

    const timestamp = Date.now();

    return `FR-${timestamp}`;
};

module.exports = generateReportId;