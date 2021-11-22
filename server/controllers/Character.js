const models = require('../models');

const Character = models.Character;

const characterPage = (req, res) => {
    Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occured'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), characters: docs});
    });
}

const makeCharacter = (req, res) => {
    if(!req.body.name){
        return res.status(400).json({error: 'Character Name is required'});
    }

    const characterData = {
        name: req.body.name,
        level: req.body.level,
        health: req.body.health,
        stats: req.body.stats,
        notes: req.body.notes,
        owner: req.session.account._id,
    };

    const newCharacter = new Character.CharacterModel(characterData);

    const characterPromise = newCharacter.save();

    characterPromise.then(() => res.json({redirect: '/characterNotes'}));

    characterPromise.catch((err) => {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: 'Character already exists.'});
        }

        return res.status(400).json({error: 'An error occured'});
    });

    return characterPromise;
}

const getCharacters = (request, response) => {
    const req = request;
    const res = response;

    return Character.CharacterModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error ocurred'});
        }

        return res.json({characters: docs});
    });
};

module.exports.characterPage = characterPage;
module.exports.getCharacters = getCharacters;
module.exports.makeCharacter = makeCharacter;
