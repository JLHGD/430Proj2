const models = require('../models');

const Account = models.Account;

const loginPage = (req, res) => {
    res.render('login', {csrfToken: req.csrfToken()});
};

////////////////////////// NEED TO IMPLEMENT THIS ////////////////////////////////
const changePassPage = (req, res) => {
    res.render('app', {csrfToken: req.csrfToken()});
};
//////////////////////////////////////////////////////////////////////////////////

const logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
};

const login = (request, response) => {
    const req = request;
    const res = response;

    const username = `${req.body.username}`;
    const password = `${req.body.pass}`;

    if(!username || !password){
        return res.status(400).json({error: 'All fields are required'});
    }

    return Account.AccountModel.authenticate(username, password, (err, account) => {
        if(err || !account) {
            return res.status(401).json({error: 'Wrong username or password'});
        }

        req.session.account = Account.AccountModel.toAPI(account);

        return res.json({redirect: '/campaignNotes'});
    });
};

////////////////////////////// NEED TO IMPLEMENT THIS /////////////////////////////
const changePass = (request, response) => {
    const req = request;
    const res = response;

    const oldPass = `${req.body.oldPass}`;
    const newPass = `${req.body.newPass}`;
    const newPassVerif = `${req.body.newPassVerif}`;

    if(!oldPass || !newPass || !newPassVerif){
        return res.status(400).json({error: 'All fields are required'});
    }

    if(newPass !== newPassVerif){
        return res.status(400).json({error: 'New password does not match re-typed password'});
    }

    return (
        Account.AccountModel.authenticate(req.session.account.username, oldPass, (err, account) => {
            if(err || !account) {
                return res.status(401).json({error: 'Wrong username or password'});
            }

            return Account.AccountModel.generateHash(newPass, (salt, hash) => {

                account.salt = salt;
                account.password = hash;

                const savePromise = account.save();

                savePromise.then(() => {
                    return res.json({redirect: '/campaignNotes'});
                });


                savePromise.catch((err) => {
                    console.log(err);

                    if(err.code === 11000){
                        return res.status(400).json({error: 'Username already in use.'});
                    }

                    return res.status(400).json({error: 'An error occurred'});
                })
            })
    }));
};
///////////////////////////////////////////////////////////////////////////////////

const signup = (request, response) => {
    const req = request;
    const res = response;

    req.body.username = `${req.body.username}`;
    req.body.pass = `${req.body.pass}`;
    req.body.pass2 = `${req.body.pass2}`;

    if(!req.body.username || !req.body.pass || !req.body.pass2){
        return res.status(400).json({error: 'All fields are required'});
    }

    if(req.body.pass !== req.body.pass2){
        return res.status(400).json({error: 'Passwords do not match'});
    }

    return Account.AccountModel.generateHash(req.body.pass, (salt, hash) => {
        const accountData = {
            username: req.body.username,
            salt,
            password: hash,
        };

        const newAccount = new Account.AccountModel(accountData);

        const savePromise = newAccount.save();

        savePromise.then(() => {
            req.session.account = Account.AccountModel.toAPI(newAccount);
            return res.json({redirect: '/campaignNotes'});
        });


        savePromise.catch((err) => {
            console.log(err);

            if(err.code === 11000){
                return res.status(400).json({error: 'Username already in use.'});
            }

            return res.status(400).json({error: 'An error occurred'});
        })
    });
};

const getToken = (request, response) => {
    const req = request;
    const res = response;

    const csrfJSON = {
        csrfToken: req.csrfToken(),
    };

    res.json(csrfJSON);
};

module.exports.loginPage = loginPage;
module.exports.login = login;
module.exports.changePassPage = changePassPage;
module.exports.changePass = changePass;
module.exports.logout = logout;
module.exports.signup = signup;
module.exports.getToken = getToken;
