const express = require("express");
const userController = require("../controllers/user.controller");
const jwt = require("jsonwebtoken");
const models = require("../models");

const router = express.Router();

router.post("/register", userController.signUp);
router.post("/login", userController.login);
router.put("/updatelevel", userController.updatelevel);
router.put("/complete", userController.gamecompletion);

const verifyJWT = (req, res, next) => {
  const token = req.headers["x-access-token"];
  if (!token) {
    res.send("We need a token, please give it to us next time");
  } else {
    jwt.verify(token, "jwt", async (err, decoded) => {
      if (err) {
        res.json({
          auth: false,
          err,
          message: "you have failed to authenticate",
        });
      } else {
        const u = JSON.parse(atob(token.split(".")[1]));
        const progress = await models.Progress.findOne({
          where: { username: u.username },
        });
        var r1s = null;
        if (progress.r1s) {
          r1s = progress.r1s;
        }
        models.User.findOne({ where: { username: u.username } }).then(
          (user) => {
            const newtoken = jwt.sign(
              {
                username: user.username,
                name: user.name,
                userId: user.id,
                level: user.level,
                isAdmin: user.isAdmin,
                success: true,
                isAuth: true,
                r1s,
                completed: user.completed,
              },
              "jwt",
              { expiresIn: "1d" }
            );
            req.newtoken = newtoken;
            next();
          }
        );
      }
    });
  }
};

router.get("/isUserAuth", verifyJWT, (req, res) => {
  console.log(req.newtoken);
  res.json({
    auth: true,
    token: req.newtoken,
    message: "you are authenticated",
  });
});

module.exports = router;
