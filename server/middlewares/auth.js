const { verifyToken } = require("../helper");


const authentication = async (req, res, next) => {
  try {
    if (!req.headers.authorization) throw { name: "Unauthorized", code: 401 };

    const [type, token] = req.headers.authorization.split(" ");
    if (type !== "Bearer") throw { name: "Unauthorized", code: 401 };

    const payload = verifyToken(token);
    // const user = await User.findByPk(payload.id);
    // if (!user) throw { name: "Unauthorized", code: 401 };

    // req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = authentication;
