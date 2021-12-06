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
          onSubmit={editCharacter}
          name="editCharacterForm"
          action="/characterNotes"
          method="POST"
          className="editCharacterForm"
    >

        <label htmlFor="name">Name: </label>
        <input id="characterName" type="text" name="name" placeholder="Character Name"/>

        <label htmlFor="characterlevel">Level: </label>
        <input id="characterLevel" type="text" name="characterlevel" placeholder="Level"/>

        <label htmlFor="characterhealth">Health: </label>
        <input id="characterHealth" type="text" name="characterhealth" placeholder="Health"/>

        <label htmlFor="characterstats">Stats: </label>
        <textarea id="characterStats" name="characterstats" form="editCharacterForm" placeholder="Stats"></textarea>

        <label htmlFor="characternotes">Notes: </label>
        <textarea id="characterNotes" name="characternotes" form="editCharacterForm" placeholder="Notes"></textarea>

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

            <label htmlFor="name">Name: </label>
            <input id="characterName" type="text" name="name" placeholder="Character Name"/>

            <label htmlFor="characterlevel">Level: </label>
            <input id="characterLevel" type="text" name="characterlevel" placeholder="Level"/>

            <label htmlFor="characterhealth">Health: </label>
            <input id="characterHealth" type="text" name="characterhealth" placeholder="Health"/>

            <label htmlFor="characterstats">Stats: </label>
            <textarea id="characterStats" name="characterstats" form="editCharacterForm" placeholder="Stats"></textarea>

            <label htmlFor="characternotes">Notes: </label>
            <textarea id="characterNotes" name="characternotes" form="editCharacterForm" placeholder="Notes"></textarea>

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
                <h3 className="emptyCharacter">No characters created</h3>
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

const loadCharactersFromServer = () => {
    sendAjax('GET', '/getCharacters', null, (data) => {
        ReactDOM.render(
            <CharacterList character={data.characters} />, document.querySelector("#items")
        );
    });
};

const renderCharacters = function(csrf) {
    ReactDOM.render(
        <NewCharacterForm csrf={csrf} />, document.querySelector("#notes")
    );

    ReactDOM.render(
        <CharacterList characters={[]} />, document.querySelector("#items")
    );

    loadCharactersFromServer();
};
