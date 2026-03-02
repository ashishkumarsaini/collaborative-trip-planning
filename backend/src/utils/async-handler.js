export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      const { statusCode, data, success, errors, message, stack } = error;

      res.status(400).json({
        statusCode,
        data,
        success,
        errors,
        message,
        stack
      });
    });
  };
};
