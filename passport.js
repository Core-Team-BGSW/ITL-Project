const fs = require('fs');
const https = require('https');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const { OIDCStrategy } = require('passport-azure-ad');

const app = express();

const options = {
    key: fs.readFileSync('C:/Serious/server.key'), // Path to your SSL key
    cert: fs.readFileSync('C:/Serious/server.cert') // Path to your SSL certificate
};

passport.use(new OIDCStrategy({
    identityMetadata: `https://login.microsoftonline.com/0ae51e19-07c8-4e4b-bb6d-648ee58410f4/.well-known/openid-configuration`,
    clientID: '6e8b1c52-7e1a-428c-951f-c4005c8dff21',
    responseType: 'code id_token',
    responseMode: 'form_post',
    redirectUrl: 'https://localhost:3001/auth/callback', // Use HTTPS here
    allowHttpForRedirectUrl: false,
    clientSecret: 'd509e844-96ab-4f6d-9276-fab1a1b01f39',
    validateIssuer: true,
    passReqToCallback: false,
    scope: ['profile', 'email', 'openid'],
}, (iss, sub, profile, accessToken, refreshToken, done) => {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
});

app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

app.post('/auth/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/' }), (req, res) => {
    res.redirect('/profile');
});

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Hello ${req.user.displayName}`);
    } else {
        res.redirect('/');
    }
});

app.get('/', (req, res) => {
    res.send('<a href="/login">Login with Azure AD</a>');
});

https.createServer(options, app).listen(3001, () => { // Changed to HTTPS and port 3001
    console.log('Server running on https://localhost:3001');
});
