export const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error) => {
      const { statusCode, data, success, errors, message, stack } = error;

      console.log({ error });

      res.status(statusCode).json({
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
