const launchFunctions = {
    'name': 'getLaunchesName',
    'total tests': 'getTotalTests',
    'passed tests': 'getPassedTests',
    'failed tests': 'getFailedTests',
    'skipped tests': 'getSkippedTests',
    'product bug': 'getCountOfProductBug',
    'automation bug': 'getCountOfAutomationBug',
    'system issue': 'getCountOfSystemIssue',
    'to investigate issue': 'getCountOfToInvestigate'
};

const siuteFunctions = {
    'name': 'getSuiteName',
    'total tests': 'getTotalSiutes',
    'passed tests': 'getPassedSiutes',
    'failed tests': 'getFailedSiutes',
    'skipped tests': 'getSkippedTests',
    'product bug': 'getCountOfSiutesProductBug',
    'automation bug': 'getCountOfSiutesAutoBug',
    'system issue': 'getCountOfSiutesToInvestigate',
    'to investigate issue': 'getCountOfSiutesToInvestigate'
};

module.exports = { siuteFunctions, launchFunctions }