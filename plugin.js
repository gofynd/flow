const { sources } = require('webpack');
const path = require("path");

const polyfillCodePath = path.join(__dirname, './polyfill.js');
const polyfillCode = readFileSync(polyfillCodePath, { encoding: 'utf-8'});

class NodeJSPolyfill {
  constructor(options = {}) {
    this.snippet = options.snippet || polyfillCode;
  }

  apply(compiler) {
    compiler.hooks.compilation.tap('NodeJSPolyfill', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'NodeJSPolyfill',
          stage: compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets) => {
          for (const assetName in assets) {
            console.log({assetName})
            if (assetName.endsWith('.js')) {
              const originalSource = assets[assetName].source();
              const modifiedSource = `${this.snippet}\n${originalSource}`;
              assets[assetName] = new sources.RawSource(modifiedSource);
            }
          }
        }
      );
    });
  }
}

module.exports = NodeJSPolyfill;
