const models = require("../models");

function startRound(req, res) {
  models.Progress.findOne({ where: { username: req.body.username } }).then(
    async (user) => {
      if (user == null) {
        res.status(401).json({
          message: "User Not Found",
        });
      } else {
        try {
          var l = req.body.level;
          if (l == 0) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r1s == null) {
              await models.Progress.update(
                {
                  r1s: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 1) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r2s == null) {
              await models.Progress.update(
                {
                  r2s: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 2) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r3s == null) {
              await models.Progress.update(
                {
                  r3s: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 3) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r4s == null) {
              await models.Progress.update(
                {
                  r4s: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 4) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r5s == null) {
              await models.Progress.update(
                {
                  r5s: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          }
          res.status(200).json({
            message: "Updated Progress successfully",
            success: true,
          });
        } catch (err) {
          res.status(400).json({
            message: "Something went wrong",
            err,
            success: false,
          });
        }
      }
    }
  );
}

function endRound(req, res) {
  models.Progress.findOne({ where: { username: req.body.username } }).then(
    async (user) => {
      if (user == null) {
        res.status(401).json({
          message: "User Not Found",
        });
      } else {
        try {
          var l = req.body.level;
          if (l == 0) {
            console.log(l);
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r1e == null) {
              await models.Progress.update(
                {
                  r1e: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 1) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r2e == null) {
              await models.Progress.update(
                {
                  r2e: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 2) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r3e == null) {
              await models.Progress.update(
                {
                  r3e: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 3) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r4e == null) {
              await models.Progress.update(
                {
                  r4e: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          } else if (l == 4) {
            const val = await models.Progress.findOne({
              where: { username: req.body.username },
            });
            if (val.r5e == null) {
              await models.Progress.update(
                {
                  r5e: new Date().toString(),
                },
                {
                  where: { username: req.body.username },
                }
              );
            }
          }
          res.status(200).json({
            message: "Updated Progress successfully",
            success: true,
          });
        } catch (err) {
          res.status(400).json({
            message: "Something went wrong",
            err,
            success: false,
          });
        }
      }
    }
  );
}
module.exports = {
  startRound: startRound,
  endRound: endRound,
};
