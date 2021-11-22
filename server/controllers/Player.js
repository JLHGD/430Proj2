const models = require('../models');

const Player = models.Player;

const playerPage = (req, res) => {
    Player.PlayerModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occured'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), players: docs});
    });
}

const makePlayer = (req, res) => {
    if(!req.body.playername || !req.body.charactername){
        return res.status(400).json({error: 'Player Name and Character Name are both required'});
    }

    const playerData = {
        playername: req.body.playername,
        charactername: req.body.charactername,
        characterlevel: req.body.characterlevel,
        characterhealth: req.body.characterhealth,
        characterstats: req.body.characterstats,
        notes: req.body.notes,
        owner: req.session.account._id,
    };

    const newPlayer = new Player.PlayerModel(playerData);

    const playerPromise = newPlayer.save();

    playerPromise.then(() => res.json({redirect: '/playerNotes'}));

    playerPromise.catch((err) => {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: 'Player already exists.'});
        }

        return res.status(400).json({error: 'An error occured'});
    });

    return playerPromise;
}

const getPlayers = (request, response) => {
    const req = request;
    const res = response;

    return Player.PlayerModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error ocurred'});
        }

        return res.json({players: docs});
    });
};

module.exports.playerPage = playerPage;
module.exports.getPlayers = getPlayers;
module.exports.makePlayer = makePlayer;
