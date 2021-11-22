const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);

    app.get('/getCampaigns', mid.requiresLogin, controllers.Campaign.getCampaigns);
    app.get('/getCharacters', mid.requiresLogin, controllers.Character.getCharacters);
    app.get('/getMiscNotes', mid.requiresLogin, controllers.Misc.getMiscNotes);
    app.get('/getPlayers', mid.requiresLogin, controllers.Player.getPlayers);
    app.get('/getSessions', mid.requiresLogin, controllers.Session.getSessions);

    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout,  controllers.Account.login);
    app.post('/signup', mid.requiresSecure, mid.requiresLogout,  controllers.Account.signup);
    app.get('/logout', mid.requiresLogin, controllers.Account.logout);
    // app.get('/resetpass', mid.requiresSecure, controllers.Account.resetPassPage);
    // app.post('/resetpass', mid.requiresSecure, controllers.Account.resetPass);

    app.get('/campaignNotes', mid.requiresLogin, controllers.Campaign.campaignPage);
    app.post('/campaignNotes', mid.requiresLogin, controllers.Campaign.makeCampaign);

    app.get('/characterNotes', mid.requiresLogin, controllers.Character.characterPage);
    app.get('/characterNotes', mid.requiresLogin, controllers.Character.makeCharacter);

    app.get('/miscNotes', mid.requiresLogin, controllers.Misc.miscPage);
    app.get('/miscNotes', mid.requiresLogin, controllers.Misc.makeMisc);

    app.get('/playerNotes', mid.requiresLogin, controllers.Player.playerPage);
    app.get('/playerNotes', mid.requiresLogin, controllers.Player.makePlayer);

    app.get('/sessionNotes', mid.requiresLogin, controllers.Session.sessionPage);
    app.get('/sessionNotes', mid.requiresLogin, controllers.Session.makeSession);

    app.get('/', mid.requiresSecure, mid.requiresLogout,  controllers.Account.loginPage);
};

module.exports = router;
