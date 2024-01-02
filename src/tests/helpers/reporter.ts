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

  public displaySpecErrorMessages(spec: CustomReporterResult): string {
    let messages = '';
    for (const expectation of spec.failedExpectations) {
      messages += `Failure: ${expectation.message}\n`;
      messages += `${expectation.stack}\n`;
    }
    return messages;
  }

  public displaySummaryErrorMessages(result: CustomReporterResult): string {
    let messages = '';
    for (const expectation of result.failedExpectations) {
      messages += `Global Failure: ${expectation.message}\n`;
      messages += `${expectation.stack}\n`;
    }
    return messages;
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
