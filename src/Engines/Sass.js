const SassLib = require("node-sass");
const TemplateEngine = require("./TemplateEngine");
const TemplatePath = require("../TemplatePath");

class Sass extends TemplateEngine {
  constructor(name, includesDir) {
    super(name, includesDir);

    this.setLibrary(this.config.libraryOverrides.sass);
  }

  setLibrary(lib) {
    this.sassLib = lib || SassLib;
    this.setEngineLib(this.sassLib);
  }

  async compile(str, inputPath) {
    return function(_) {
      // TODO inject functions for use in Sass? Data as variables? Support partials?
      if (str.trim()) {
        let result = this.renderSync({
          data: str,
          includePaths: [TemplatePath.getDirFromFilePath(inputPath)]
        });

        return result.css;
      } else {
        // Don't try to render blank files
        return str;
      }
    }.bind(this.sassLib);
  }
}

module.exports = Sass;
