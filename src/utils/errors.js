class ErrorWithCode extends Error {
    constructor(message, code) {
        super(message);

        Error.captureStackTrace(this, this.constructor);

        Object.assign(this, { code });
    }
}

export class UnkownAlgorithm extends ErrorWithCode {
    constructor(algorithm) {
        super(`Unknown algorithm \`${algorithm}\``, 'UNKNOWN_ALGORITHM');
    }
}

export class UnkownAlgorithmParam extends ErrorWithCode {
    constructor(param) {
        super(`Unknown algorithm param \`${param}\``, 'UNKNOWN_ALGORITHM_PARAM');
    }
}

export class NilAlgorithmParam extends ErrorWithCode {
    constructor(param) {
        super(`Algorithm param \`${param}\` can't be null or undefined`, 'NIL_ALGORITHM_PARAM');
    }
}

export class TypeMismatchAlgorithmParam extends ErrorWithCode {
    constructor(param, type) {
        super(`Expected algorithm param \`${param}\` to be of type \`${type}\``, 'TYPE_ALGORITHM_PARAM');
    }
}
