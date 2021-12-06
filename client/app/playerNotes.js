let popUpOpen = false;

const handlePlayer = (e) => {
    e.preventDefault();

    if($("#playerName").val() == '' || $("#characterName").val() == ''){
        handleError("All fields are required for player doc creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newPlayerForm").attr("action"), $("#newPlayerForm").serialize(), function() {
        loadPlayersFromServer();
    });

    return false;
};

const editPlayer = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editPlayerForm").attr("action"), $("#editPlayerForm").serialize(), function() {
        loadPlayersFromServer();
    });
};

const EditPlayerForm = (props) => {
    <form id="editPlayerForm"
          onSubmit={editPlayer}
          name="editPlayerForm"
          action="/playerNotes"
          method="POST"
          className="editPlayerForm"
    >

        <label htmlFor="playername">Player name: </label>
        <input id="playerName" type="text" name="playername" placeholder="Name"/>

        <label htmlFor="charactername">Character Name: </label>
        <input id="characterName" type="text" name="charactername" placeholder="Name"/>

        <label htmlFor="characterlevel">Level: </label>
        <input id="characterLevel" type="text" name="characterlevel" placeholder="Level"/>

        <label htmlFor="characterhealth">Health: </label>
        <input id="characterHealth" type="text" name="characterhealth" placeholder="Health"/>

        <label htmlFor="characterstats">Stats: </label>
        <textarea id="characterStats" name="characterstats" form="editCharacterForm" placeholder="Stats"></textarea>

        <label htmlFor="characternotes">Notes: </label>
        <textarea id="characterNotes" name="characternotes" form="editCharacterForm" placeholder="Notes"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editPlayer" type="submit" value="Finish Editing" />
    </form>
};

const NewPlayerForm = (props) => {
    return (
        <form id="newPlayerForm"
              onSubmit={handlePlayer}
              name="newPlayerForm"
              action="/playerNotes"
              method="POST"
              className="newPlayerForm"
        >

            <label htmlFor="playername">Player name: </label>
            <input id="playerName" type="text" name="playername" placeholder="Name"/>

            <label htmlFor="charactername">Character Name: </label>
            <input id="characterName" type="text" name="charactername" placeholder="Name"/>

            <label htmlFor="characterlevel">Level: </label>
            <input id="characterLevel" type="text" name="characterlevel" placeholder="Level"/>

            <label htmlFor="characterhealth">Health: </label>
            <input id="characterHealth" type="text" name="characterhealth" placeholder="Health"/>

            <label htmlFor="characterstats">Stats: </label>
            <textarea id="characterStats" name="characterstats" form="editCharacterForm" placeholder="Stats"></textarea>

            <label htmlFor="characternotes">Notes: </label>
            <textarea id="characterNotes" name="characternotes" form="editCharacterForm" placeholder="Notes"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createPlayer" type="submit" value="Create" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewPlayerForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at playerNodes return div key...
const PlayerList = function(props) {
    if(props.players.length === 0) {
        return (
            <div className="playerList">
                <h3 className="emptyPlayer">No players created</h3>
            </div>
        );
    }

    const playerNodes = props.players.map(function(player) {
        return (
            <div key={player._id} className="player">
                <h3 className="playerName"> {player.playername} </h3>
                <p className="characterName"> {player.charactername}</p>
                <p className="characterLevel"> Level: {player.characterlevel} </p>
                <p className="characterHealth"> Health: {player.characterhealth} </p>
                <p className="characterStats"> Stats: {player.characterstats} </p>
                <p className="characterNotes"> Notes: {player.notes} </p>
                <button type="button" className="editPlayerButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="playerList">
            {playerNodes}
        </div>
    );
};

const loadPlayersFromServer = () => {
    sendAjax('GET', '/getPlayers', null, (data) => {
        ReactDOM.render(
            <PlayerList players={data.players} />, document.querySelector("#items")
        );
    });
};

const renderPlayers = function(csrf) {
    ReactDOM.render(
        <NewPlayerForm csrf={csrf} />, document.querySelector("#notes")
    );

    ReactDOM.render(
        <PlayerList players={[]} />, document.querySelector("#items")
    );

    loadPlayersFromServer();
};
