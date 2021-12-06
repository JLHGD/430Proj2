let popUpOpen = false;

const handleMisc = (e) => {
    e.preventDefault();

    if($("#miscTitle").val() == '' || $("#miscNotes").val() == ''){
        handleError("All fields are required for misc creation (Can be editted later)");
        return false;
    }

    sendAjax('POST', $("#newMiscForm").attr("action"), $("#newMiscForm").serialize(), function() {
        loadMiscFromServer();
    });

    return false;
};

const editMisc = (e) => {
    e.preventDefault();

    sendAjax('POST', $("#editMiscForm").attr("action"), $("#editMiscForm").serialize(), function() {
        loadMiscFromServer();
    });
};

const EditMiscForm = (props) => {
    <form id="editMiscForm"
          onSubmit={editMisc}
          name="editMiscForm"
          action="/miscNotes"
          method="POST"
          className="editMiscForm"
    >

        <label htmlFor="title">Title: </label>
        <input id="miscTitle" type="text" name="title" placeholder="Misc Title"/>

        <label htmlFor="miscnotes">Setting Information: </label>
        <textarea id="miscNotes" name="miscnotes" form="editMiscForm" placeholder="Notes"></textarea>

        <input type="hidden" name="_csrf" value={props.csrf}/>

        <input className="editMisc" type="submit" value="Finish Editing" />
    </form>
};

const NewMiscForm = (props) => {
    return (
        <form id="newMiscForm"
              onSubmit={handleMisc}
              name="newMiscForm"
              action="/miscNotes"
              method="POST"
              className="newMiscForm"
        >

            <label htmlFor="title">Title: </label>
            <input id="miscTitle" type="text" name="title" placeholder="Misc Title"/>

            <label htmlFor="miscnotes">Setting Information: </label>
            <textarea id="miscNotes" name="miscnotes" form="editMiscForm" placeholder="Notes"></textarea>

            <input type="hidden" name="_csrf" value={props.csrf}/>

            <input className="createMisc" type="submit" value="Create" />
        </form>
    );
};


// Can add images to here with an image tag
////// COPY NewForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at Nodes return div key...
const MiscList = function(props) {
    if(props.miscNotes.length === 0) {
        return (
            <div className="miscList">
                <h3 className="emptyMisc">No misc notes created</h3>
            </div>
        );
    }

    const miscNodes = props.miscNotes.map(function(misc) {
        return (
            <div key={misc._id} className="misc">
                <h3 className="miscTitle"> {misc.title} </h3>
                <p className="miscNotes"> Notes: {misc.notes} </p>
                <button type="button" className="editMiscButton">Edit</button>
            </div>
        );
    });

    return (
        <div className="miscList">
            {miscNodes}
        </div>
    );
};

const loadMiscFromServer = () => {
    sendAjax('GET', '/getMiscNotes', null, (data) => {
        ReactDOM.render(
            <MiscList miscNotes={data.miscNotes} />, document.querySelector("#items")
        );
    });
};

const renderMisc = function(csrf) {
    ReactDOM.render(
        <NewMiscForm csrf={csrf} />, document.querySelector("#notes")
    );

    ReactDOM.render(
        <MiscList miscNotes={[]} />, document.querySelector("#items")
    );

    loadMiscFromServer();
};
