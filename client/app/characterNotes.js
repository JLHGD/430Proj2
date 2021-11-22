let popUpOpen = false;

const handleCharacter = (e) => {
    e.preventDefault();

    if($("#characterName").val() == ''){
        handleError("Character Name is required for character creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newCharacterForm").attr("action"), $("#newCharacterForm").serialize(), function() {
        loadCharactersFromServer();
    });

    return false;
};

const editCharacter = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editCharacterForm").attr("action"), $("#editCharacterForm").serialize(), function() {
        loadCharactersFromServer();
    });
};

const EditCharacterForm = (props) => {
    <form id="editCharacterForm"
          onSubmit={editCahracter}
          name="editCharacterForm"
          action="/characterNotes"
          method="POST"
          className="editCharacterForm"
    >

        <label htmlFor="title">Title: </label>
        <input id="characterTitle" type="text" name="title" placeholder="Character Title"/>

        <label htmlFor="gamesystem">Game System: </label>
        <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

        <label htmlFor="settinginfo">Setting Information: </label>
        <textarea id="settinginfo" name="settinginfo" form="editCharacterForm" placeholder="Setting Information"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editCharacter" type="submit" value="Finish Editing" />
    </form>
};

const NewCharacterForm = (props) => {
    return (
        <form id="newCharacterForm"
              onSubmit={handleCharacter}
              name="newCharacterForm"
              action="/cahracterNotes"
              method="POST"
              className="newCharacterForm"
        >

            <label htmlFor="title">Title: </label>
            <input id="characterTitle" type="text" name="title" placeholder="Character Title"/>

            <label htmlFor="gamesystem">Game System: </label>
            <input id="gameSystem" type="text" name="gamesystem" placeholder="Game System"/>

            <label htmlFor="settinginfo">Setting Information: </label>
            <textarea id="settinginfo" name="settinginfo" form="newCharacterForm" placeholder="Setting Information"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createCharacter" type="submit" value="Create" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at Nodes return div key...
const CharacterList = function(props) {
    if(props.characters.length === 0) {
        return (
            <div className="characterList">
                <h3 className="emptyCCharacter">No characters created</h3>
            </div>
        );
    }

    const characterNodes = props.characters.map(function(character) {
        return (
            <div key={character._id} className="character">
                <h3 className="characterName"> {character.name} </h3>
                <p className="characterLevel"> Game System: {character.level} </p>
                <p className="characterHealth"> Setting Info: {character.health} </p>
                <p className="characterStats"> Setting Info: {character.stats} </p>
                <p className="characterNotes"> Setting Info: {character.notes} </p>
                <button type="button" className="editCharacterButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="characterList">
            {characterNodes}
        </div>
    );
};

const loadCharacterFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList character={data.characters} />, document.querySelector("#characters")
        );
    });
};

const setup = function(csrf) {
    ReactDOM.render(
        <NewCharacterForm csrf={csrf} />, document.querySelector("#characterNotes")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#characters")
    );

    loadCharactersFromServer();
};

const getToken = () => {
    sendAjax('GET', '/getToken', null, (result) => {
        setup(result.csrfToken);
    });
};

$(document).ready(function() {
    getToken();
});
