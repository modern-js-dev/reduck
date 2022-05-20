"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDiagnostics = void 0;
const typescript_1 = require("@tsd/typescript");
const parser_1 = require("./parser");
const interfaces_1 = require("./interfaces");
const assertions_1 = require("./assertions");
// List of diagnostic codes that should be ignored in general
const ignoredDiagnostics = new Set([
    // Older TS version report 'await expression only allowed within async function
    interfaces_1.DiagnosticCode.AwaitExpressionOnlyAllowedWithinAsyncFunction,
    interfaces_1.DiagnosticCode.TopLevelAwaitOnlyAllowedWhenModuleESNextOrSystem
]);
// List of diagnostic codes which should be ignored inside `expectError` statements
const expectErrordiagnosticCodesToIgnore = new Set([
    interfaces_1.DiagnosticCode.ArgumentTypeIsNotAssignableToParameterType,
    interfaces_1.DiagnosticCode.PropertyDoesNotExistOnType,
    interfaces_1.DiagnosticCode.CannotAssignToReadOnlyProperty,
    interfaces_1.DiagnosticCode.TypeIsNotAssignableToOtherType,
    interfaces_1.DiagnosticCode.TypeDoesNotSatisfyTheConstraint,
    interfaces_1.DiagnosticCode.GenericTypeRequiresTypeArguments,
    interfaces_1.DiagnosticCode.ExpectedArgumentsButGotOther,
    interfaces_1.DiagnosticCode.ExpectedAtLeastArgumentsButGotOther,
    interfaces_1.DiagnosticCode.NoOverloadExpectsCountOfArguments,
    interfaces_1.DiagnosticCode.NoOverloadExpectsCountOfTypeArguments,
    interfaces_1.DiagnosticCode.NoOverloadMatches,
    interfaces_1.DiagnosticCode.PropertyMissingInType1ButRequiredInType2,
    interfaces_1.DiagnosticCode.TypeHasNoPropertiesInCommonWith,
    interfaces_1.DiagnosticCode.ThisContextOfTypeNotAssignableToMethodOfThisType,
    interfaces_1.DiagnosticCode.ValueOfTypeNotCallable,
    interfaces_1.DiagnosticCode.ExpressionNotCallable,
    interfaces_1.DiagnosticCode.OnlyVoidFunctionIsNewCallable,
    interfaces_1.DiagnosticCode.ExpressionNotConstructable,
    interfaces_1.DiagnosticCode.NewExpressionTargetLackingConstructSignatureHasAnyType,
    interfaces_1.DiagnosticCode.MemberCannotHaveOverrideModifierBecauseItIsNotDeclaredInBaseClass,
    interfaces_1.DiagnosticCode.MemberMustHaveOverrideModifier,
    interfaces_1.DiagnosticCode.StringLiteralTypeIsNotAssignableToUnionTypeWithSuggestion,
]);
/**
 * Check if the provided diagnostic should be ignored.
 *
 * @param diagnostic - The diagnostic to validate.
 * @param expectedErrors - Map of the expected errors.
 * @returns Whether the diagnostic should be `'preserve'`d, `'ignore'`d or, in case that
 * the diagnostic is reported from inside of an `expectError` assertion, the `Location`
 * of the assertion.
 */
const ignoreDiagnostic = (diagnostic, expectedErrors) => {
    if (ignoredDiagnostics.has(diagnostic.code)) {
        // Filter out diagnostics which are present in the `ignoredDiagnostics` set
        return 'ignore';
    }
    if (!expectErrordiagnosticCodesToIgnore.has(diagnostic.code)) {
        return 'preserve';
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const diagnosticFileName = diagnostic.file.fileName;
    for (const [location] of expectedErrors) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const start = diagnostic.start;
        if (diagnosticFileName === location.fileName && start > location.start && start < location.end) {
            return location;
        }
    }
    return 'preserve';
};
/**
 * Get a list of TypeScript diagnostics within the current context.
 *
 * @param context - The context object.
 * @returns List of diagnostics
 */
const getDiagnostics = (context) => {
    const diagnostics = [];
    const program = (0, typescript_1.createProgram)(context.testFiles, context.config.compilerOptions);
    const tsDiagnostics = program
        .getSemanticDiagnostics()
        .concat(program.getSyntacticDiagnostics());
    const assertions = (0, parser_1.extractAssertions)(program);
    diagnostics.push(...(0, assertions_1.handle)(program.getTypeChecker(), assertions));
    const expectedErrors = (0, parser_1.parseErrorAssertionToLocation)(assertions);
    const expectedErrorsLocationsWithFoundDiagnostics = [];
    for (const diagnostic of tsDiagnostics) {
        /* Filter out all diagnostic messages without a file or from node_modules directories, files under
         * node_modules are most definitely not under test.
         */
        if (!diagnostic.file || /[/\\]node_modules[/\\]/.test(diagnostic.file.fileName)) {
            continue;
        }
        const ignoreDiagnosticResult = ignoreDiagnostic(diagnostic, expectedErrors);
        if (ignoreDiagnosticResult !== 'preserve') {
            if (ignoreDiagnosticResult !== 'ignore') {
                expectedErrorsLocationsWithFoundDiagnostics.push(ignoreDiagnosticResult);
            }
            continue;
        }
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
        diagnostics.push({
            fileName: diagnostic.file.fileName,
            message: (0, typescript_1.flattenDiagnosticMessageText)(diagnostic.messageText, '\n'),
            severity: 'error',
            line: position.line + 1,
            column: position.character
        });
    }
    for (const errorLocationToRemove of expectedErrorsLocationsWithFoundDiagnostics) {
        expectedErrors.delete(errorLocationToRemove);
    }
    for (const [, diagnostic] of expectedErrors) {
        diagnostics.push(Object.assign(Object.assign({}, diagnostic), { message: 'Expected an error, but found none.', severity: 'error' }));
    }
    return diagnostics;
};
exports.getDiagnostics = getDiagnostics;
