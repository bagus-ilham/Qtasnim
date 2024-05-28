const errorHandler = (err, req, res, next) => {
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
    case "JsonWebTokenError":
      res.status(400).json({ message: err.errors[0].message });
      break;

    case "Unauthorized":
    case "Email already registered":
    case "Invalid email or password":
      res.status(err.code).json({ message: err.name });
      break;

    default:
      console.log(err);
      res.status(500).json({ message: "Internal server Error" });
      break;
  }
};

module.exports = errorHandler;
