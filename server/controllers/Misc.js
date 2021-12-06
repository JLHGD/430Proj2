const models = require('../models');

const Misc = models.Misc;

const miscPage = (req, res) => {
    Misc.MiscModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err){
            console.log(err);
            return res.status(400).json({error: 'An error occured'});
        }

        return res.render('app', {csrfToken: req.csrfToken(), miscnotes: docs});
    });
}

const makeMisc = (req, res) => {
    if(!req.body.title || !req.body.notes){
        return res.status(400).json({error: 'Title and Notes are required'});
    }

    const miscData = {
        title: req.body.title,
        notes: req.body.notes,
        owner: req.session.account._id,
    };

    const newMisc = new Misc.MiscModel(miscData);

    const miscPromise = newMisc.save();

    miscPromise.then(() => res.json({redirect: '/miscNotes'}));

    miscPromise.catch((err) => {
        console.log(err);
        if(err.code === 11000){
            return res.status(400).json({error: 'Misc already exists.'});
        }

        return res.status(400).json({error: 'An error occured'});
    });

    return miscPromise;
}

const getMiscNotes = (request, response) => {
    const req = request;
    const res = response;

    return Misc.MiscModel.findByOwner(req.session.account._id, (err, docs) => {
        if(err) {
            console.log(err);
            return res.status(400).json({error: 'An error ocurred'});
        }

        return res.json({miscNotes: docs});
    });
};

module.exports.miscPage = miscPage;
module.exports.getMiscNotes = getMiscNotes;
module.exports.makeMisc = makeMisc;
