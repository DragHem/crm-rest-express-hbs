class ValidationError extends Error {}
class NotFoundError extends Error {}

const handleError = (err, req, res, next) => {
  console.error(err);

  if (err instanceof NotFoundError) {
    res.status(404);
    res.render("error", {
      message: "Nie można znaleźć elementu o danym ID.",
    });
    return;
  }

  res.status(err instanceof ValidationError ? 400 : 500);

  res.render("error", {
    message:
      err instanceof ValidationError
        ? err.message
        : "Przepraszamy spróbuj ponownie później.",
  });
};

module.exports = {
  handleError,
  ValidationError,
  NotFoundError,
};
