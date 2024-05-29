const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
    case "JsonWebTokenError":
    case "SequelizeDatabaseError":
      res.status(400).json({ message: err.errors[0].message });
      break;

    case `${err.name}`:
      res.status(statusCode).json({ message: err.name });

    default:
      console.log(err);
      res.status(500).json({ message: "Internal server Error" });
      break;
  }
};

module.exports = errorHandler;
