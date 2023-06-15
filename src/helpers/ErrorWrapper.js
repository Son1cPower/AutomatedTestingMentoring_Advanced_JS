class ErrorWrapper {
    static elementError(error, element) {
        return new Error(`Something wrong with ${element}.\n Error: ${error}`);
    }
}

module.exports = { ErrorWrapper };
