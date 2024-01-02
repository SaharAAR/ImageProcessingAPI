"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jasmine_spec_reporter_1 = require("jasmine-spec-reporter");
class CustomReporter extends jasmine_spec_reporter_1.DisplayProcessor {
    displaySuite(suite) {
        return `Custom Suite: ${suite.fullName}`;
    }
    displaySuccessfulSpec(spec) {
        return `Custom Success: ${spec.fullName}`;
    }
    displaySpecErrorMessages(spec) {
        let messages = '';
        for (const expectation of spec.failedExpectations) {
            messages += `Failure: ${expectation.message}\n`;
            messages += `${expectation.stack}\n`;
        }
        return messages;
    }
    displaySummaryErrorMessages(result) {
        let messages = '';
        for (const expectation of result.failedExpectations) {
            messages += `Global Failure: ${expectation.message}\n`;
            messages += `${expectation.stack}\n`;
        }
        return messages;
    }
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE,
    },
    customProcessors: [CustomReporter],
}));
