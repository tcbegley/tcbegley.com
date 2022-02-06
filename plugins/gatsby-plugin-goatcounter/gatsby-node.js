exports.onPreInit = ({ reporter }, options) => {
  if (!options.code) {
    reporter.error(
      `The GoatCounter plugin requires a page code. Did you mean to add it?`
    );
  }
};
