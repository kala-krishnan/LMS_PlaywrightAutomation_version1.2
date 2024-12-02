var reporter = require('cucumber-html-reporter');

var options = {
        theme: 'bootstrap',
        jsonFile: 'reports/cucumber_report.json',
        output: 'reports/cucumber_report_bootstrap.html',
        reportSuiteAsScenarios: true,
        scenarioTimestamp: true,
        launchReport: true,
        columnLayout:3,
        metadata: {
            "App Version":"0.3.2",
            "Test Environment": "STAGING",
            "Browser": "Chrome  54.0.2840.98",
            "Platform": "MacBook Pro",
            "Parallel": "Scenarios",
            "Executed": "Remote"
        },
        failedSummaryReport: true,
    };

    reporter.generate(options);
    