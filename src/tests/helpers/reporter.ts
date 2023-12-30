import { DisplayProcessor, SpecReporter, StacktraceOption } from 'jasmine-spec-reporter';
//import SuiteInfo = jasmine.SuiteInfo;
import CustomReporterResult = jasmine.CustomReporterResult;

class CustomReporter extends DisplayProcessor {

    public displaySuite(suite: CustomReporterResult): string {
        return `Custom Suite: ${suite.fullName}`;
    }

    public displaySuccessfulSpec(spec: CustomReporterResult): string {
        return `Custom Success: ${spec.fullName}`;
    }

}

jasmine.getEnv().clearReporters();
jasmine.getEnv().addReporter(
    new SpecReporter({
        spec: {
            displayStacktrace: StacktraceOption.NONE,
        },
        customProcessors: [CustomReporter],
    })
);

