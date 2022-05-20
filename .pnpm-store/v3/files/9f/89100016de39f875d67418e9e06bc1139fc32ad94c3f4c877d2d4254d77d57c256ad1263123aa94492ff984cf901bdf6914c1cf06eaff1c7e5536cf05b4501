class I18CLILanguageDetector {
  formatShellLocale(rawLC) {
    if (!rawLC) {
      return '';
    } // Get array of available languages


    const LCs = rawLC.split(':');
    const LC = LCs[0] // Get `en_US` part from `en_US.UTF-8`
    .split('.')[0] // Slice en_US to en
    .split('_')[0] // slice en-US to en
    .split('-')[0];

    if (LC === 'C') {
      return '';
    }

    return LC;
  }

  detect() {
    var _ref, _ref2, _ref3, _process$env$LC_ALL;

    const shellLocale = (_ref = (_ref2 = (_ref3 = (_process$env$LC_ALL = process.env.LC_ALL) !== null && _process$env$LC_ALL !== void 0 ? _process$env$LC_ALL : process.env.LC_MESSAGES) !== null && _ref3 !== void 0 ? _ref3 : process.env.LANG) !== null && _ref2 !== void 0 ? _ref2 : process.env.LANGUAGE) !== null && _ref !== void 0 ? _ref : Intl.DateTimeFormat().resolvedOptions().locale;
    return this.formatShellLocale(shellLocale);
  }

}

export { I18CLILanguageDetector };