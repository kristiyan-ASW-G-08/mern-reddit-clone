const errorsIsEmpty = validationResult => {
    const errors = validationResult
    if (!errors.isEmpty()) {
        const error = new Error();
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
      }
}
module.exports = errorsIsEmpty