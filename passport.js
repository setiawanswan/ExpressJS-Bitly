const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const passportJWT = require("passport-jwt");

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

const jwt = require("jsonwebtoken");
const { User } = require("./models");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
          return done(null, false);
        }
        return done(null, user);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret"
    },
    async (jwtPayload, cb) => {
      console.log(jwtPayload);
      try {
        const user = await User.findOne({ where: { id: jwtPayload.data.id } });
        return cb(null, user);
      } catch (error) {
        return cb(err);
      }
    }
  )
);

passport.serializeUser(async (user, cb) => {
  return cb(null, user.id);
});

passport.deserializeUser(async (id, cb) => {
  try {
    const all = await User.findById;
    return cb(null, user);
  } catch (error) {
    return cb(err);
  }
});

module.exports = passport;
