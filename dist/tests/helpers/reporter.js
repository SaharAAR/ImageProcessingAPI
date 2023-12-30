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
}
jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(new jasmine_spec_reporter_1.SpecReporter({
    spec: {
        displayStacktrace: jasmine_spec_reporter_1.StacktraceOption.NONE,
    },
    customProcessors: [CustomReporter],
}));
