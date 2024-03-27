let passport = require('passport')
let GoogleStrategy = require('passport-google-oauth20').Strategy;

const GOOGLE_CLIENT_ID = '58322098771-99hgutjtge4m28f142q47t85mmfdok5e.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:4200/login",
    passReqToCallback: true
}, (accessToken, refreshToken, profile, cb) => {
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    return cb(null, profile);
    // });
}
));

passport.serializeUser((user, done) => {
    console.log("user>>>>", user);
    done(null, user)
})

passport.deserializeUser((user, done) => {
    done(null, user)
})