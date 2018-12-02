const NodeEnvironment = require('jest-environment-node');

class Environment extends NodeEnvironment {
    constructor(config) {
        super(
            Object.assign({}, config, {
                globals: Object.assign({}, config.globals, {
                    Uint8Array: Uint8Array,
                    ArrayBuffer: ArrayBuffer,
                }),
            })
        );
    }
}

module.exports = Environment;
