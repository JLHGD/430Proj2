"use strict";

var ChangingAdvertisement = function ChangingAdvertisement(props) {
  if (window.location.pathname === '/campaignNotes') {
    return /*#__PURE__*/React.createElement("a", {
      href: "https://www.google.com/"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/ad1.png",
      alt: "Advertisement 1"
    }));
  } else if (window.location.pathname === '/playerNotes') {
    return /*#__PURE__*/React.createElement("a", {
      href: "https://www.google.com/"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/ad2.png",
      alt: "Advertisement 2"
    }));
  } else {
    return /*#__PURE__*/React.createElement("a", {
      href: "https://www.google.com/"
    }, /*#__PURE__*/React.createElement("img", {
      src: "assets/img/ad3.png",
      alt: "Advertisement 3"
    }));
  }
};

var renderAds = function renderAds(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangingAdvertisement, {
    csrf: csrf
  }), document.querySelector("#ads"));
};
"use strict";

var setup = function setup(csrf) {
  switch (window.location.pathname) {
    case '/campaignNotes':
      renderCampaigns(csrf);
      break;

    case '/characterNotes':
      renderCharacters(csrf);
      break;

    case '/playerNotes':
      renderPlayers(csrf);
      break;

    case '/miscNotes':
      renderMisc(csrf);
      break;

    case '/sessionNotes':
      renderSessions(csrf);
      break;

    case '/changePass':
      renderChangePass(csrf);
      break;

    default:
      renderCampaigns(csrf);
  }

  renderAds(csrf);
};

var getToken = function getToken() {
  sendAjax('GET', '/getToken', null, function (result) {
    setup(result.csrfToken);
  });
};

$(document).ready(function () {
  getToken();
});
"use strict";

var popUpOpen = false;

var handleCampaign = function handleCampaign(e) {
  e.preventDefault();

  if ($("#campaignTitle").val() == '' || $("#gameSystem").val() == '' || $("#settingInfo").val() == '') {
    handleError("All fields are required for campaign creation (Can be editted later)");
    return false;
  }

  sendAjax('POST', $("#newCampaignForm").attr("action"), $("#newCampaignForm").serialize(), function () {
    loadCampaignsFromServer();
  });
  return false;
};

var editCampaign = function editCampaign(e) {
  e.preventDefault();
  sendAjax('POST', $("#editCampaignForm").attr("action"), $("#editCampaignForm").serialize(), function () {
    loadCampaignsFromServer();
  });
};

var EditCampaignForm = function EditCampaignForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "editCampaignForm",
    onSubmit: editCampaign,
    name: "editCampaignForm",
    action: "/campaignNotes",
    method: "POST",
    className: "editCampaignForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "campaignTitle",
    type: "text",
    name: "title",
    placeholder: "Campaign Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "gamesystem"
  }, "Game System: "), /*#__PURE__*/React.createElement("input", {
    id: "gameSystem",
    type: "text",
    name: "gamesystem",
    placeholder: "Game System"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "settinginfo"
  }, "Setting Information: "), /*#__PURE__*/React.createElement("textarea", {
    id: "settinginfo",
    name: "settinginfo",
    form: "editCampaignForm",
    placeholder: "Setting Information"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "editCampaign",
    type: "submit",
    value: "Finish Editing"
  }));
};

var NewCampaignForm = function NewCampaignForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newCampaignForm",
    onSubmit: handleCampaign,
    name: "newCampaignForm",
    action: "/campaignNotes",
    method: "POST",
    className: "newCampaignForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "campaignTitle",
    type: "text",
    name: "title",
    placeholder: "Campaign Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "gamesystem"
  }, "Game System: "), /*#__PURE__*/React.createElement("input", {
    id: "gameSystem",
    type: "text",
    name: "gamesystem",
    placeholder: "Game System"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "settinginfo"
  }, "Setting Information: "), /*#__PURE__*/React.createElement("textarea", {
    id: "settinginfo",
    name: "settinginfo",
    form: "newCampaignForm",
    placeholder: "Setting Information"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "createCampaign",
    type: "submit",
    value: "Create"
  }));
}; // Can add images to here with an image tag
////// COPY NewCampaignForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at campaignNodes return div key...


var CampaignList = function CampaignList(props) {
  if (props.campaigns.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "campaignList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCampaign"
    }, "No campaigns created"));
  }

  var campaignNodes = props.campaigns.map(function (campaign) {
    return /*#__PURE__*/React.createElement("div", {
      key: campaign._id,
      className: "campaign"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "campaignTitle"
    }, " ", campaign.title, " "), /*#__PURE__*/React.createElement("p", {
      className: "campaignGameSystem"
    }, " Game System: ", campaign.gamesystem, " "), /*#__PURE__*/React.createElement("p", {
      className: "campaignSettingInfo"
    }, " Setting Info: ", campaign.settinginfo, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editCampaignButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "campaignList"
  }, campaignNodes);
};

var loadCampaignsFromServer = function loadCampaignsFromServer() {
  sendAjax('GET', '/getCampaigns', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CampaignList, {
      campaigns: data.campaigns
    }), document.querySelector("#items"));
  });
};

var renderCampaigns = function renderCampaigns(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCampaignForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CampaignList, {
    campaigns: []
  }), document.querySelector("#items"));
  loadCampaignsFromServer();
};
"use strict";

var handleCampaign = function handleCampaign(e) {
  e.preventDefault();

  if ($("#oldPass").val() == '' || $("#newPass").val() == '' || $("#newPassVerif").val() == '') {
    handleError("All fields are required to change password");
    return false;
  }

  sendAjax('POST', $("#changePassForm").attr("action"), $("#changePassForm").serialize(), redirect);
  return false;
};

var ChangePassForm = function ChangePassForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "changePassForm",
    onSubmit: handleCampaign,
    name: "changePassForm",
    action: "/changePass",
    method: "POST",
    className: "changePassForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "oldPass"
  }, "Old Password: "), /*#__PURE__*/React.createElement("input", {
    id: "oldPass",
    type: "password",
    name: "oldPass",
    placeholder: "Old Pass"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPass"
  }, "New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "newPass",
    type: "password",
    name: "newPass",
    placeholder: "New Pass"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "newPassVerif"
  }, "Re-type New Password: "), /*#__PURE__*/React.createElement("input", {
    id: "newPassVerif",
    type: "password",
    name: "newPassVerif",
    placeholder: "Type New Pass Again"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "changePassword",
    type: "submit",
    value: "Change Password"
  }));
};

var renderChangePass = function renderChangePass(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(ChangePassForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
};
"use strict";

var popUpOpen = false;

var handleCharacter = function handleCharacter(e) {
  e.preventDefault();

  if ($("#characterName").val() == '') {
    handleError("Character Name is required for character creation (Can be editted later)");
    return false;
  }

  sendAjax('POST', $("#newCharacterForm").attr("action"), $("#newCharacterForm").serialize(), function () {
    loadCharactersFromServer();
  });
  return false;
};

var editCharacter = function editCharacter(e) {
  e.preventDefault();
  sendAjax('POST', $("#editCharacterForm").attr("action"), $("#editCharacterForm").serialize(), function () {
    loadCharactersFromServer();
  });
};

var EditCharacterForm = function EditCharacterForm(props) {
  /*#__PURE__*/
  React.createElement("form", {
    id: "editCharacterForm",
    onSubmit: editCharacter,
    name: "editCharacterForm",
    action: "/characterNotes",
    method: "POST",
    className: "editCharacterForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterlevel"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "characterLevel",
    type: "text",
    name: "characterlevel",
    placeholder: "Level"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterhealth"
  }, "Health: "), /*#__PURE__*/React.createElement("input", {
    id: "characterHealth",
    type: "text",
    name: "characterhealth",
    placeholder: "Health"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterstats"
  }, "Stats: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterStats",
    name: "characterstats",
    form: "editCharacterForm",
    placeholder: "Stats"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characternotes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterNotes",
    name: "characternotes",
    form: "editCharacterForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "editCharacter",
    type: "submit",
    value: "Finish Editing"
  }));
};

var NewCharacterForm = function NewCharacterForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newCharacterForm",
    onSubmit: handleCharacter,
    name: "newCharacterForm",
    action: "/cahracterNotes",
    method: "POST",
    className: "newCharacterForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "name"
  }, "Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "name",
    placeholder: "Character Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterlevel"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "characterLevel",
    type: "text",
    name: "characterlevel",
    placeholder: "Level"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterhealth"
  }, "Health: "), /*#__PURE__*/React.createElement("input", {
    id: "characterHealth",
    type: "text",
    name: "characterhealth",
    placeholder: "Health"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterstats"
  }, "Stats: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterStats",
    name: "characterstats",
    form: "editCharacterForm",
    placeholder: "Stats"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characternotes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterNotes",
    name: "characternotes",
    form: "editCharacterForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "createCharacter",
    type: "submit",
    value: "Create"
  }));
}; // Can add images to here with an image tag
////// COPY NewForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at Nodes return div key...


var CharacterList = function CharacterList(props) {
  if (props.characters.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "characterList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyCharacter"
    }, "No characters created"));
  }

  var characterNodes = props.characters.map(function (character) {
    return /*#__PURE__*/React.createElement("div", {
      key: character._id,
      className: "character"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "characterName"
    }, " ", character.name, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterLevel"
    }, " Game System: ", character.level, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterHealth"
    }, " Setting Info: ", character.health, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterStats"
    }, " Setting Info: ", character.stats, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterNotes"
    }, " Setting Info: ", character.notes, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editCharacterButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "characterList"
  }, characterNodes);
};

var loadCharactersFromServer = function loadCharactersFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      character: data.characters
    }), document.querySelector("#items"));
  });
};

var renderCharacters = function renderCharacters(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCharacterForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#items"));
  loadCharactersFromServer();
};
"use strict";

var popUpOpen = false;

var handleMisc = function handleMisc(e) {
  e.preventDefault();

  if ($("#miscTitle").val() == '' || $("#miscNotes").val() == '') {
    handleError("All fields are required for misc creation (Can be editted later)");
    return false;
  }

  sendAjax('POST', $("#newMiscForm").attr("action"), $("#newMiscForm").serialize(), function () {
    loadMiscFromServer();
  });
  return false;
};

var editMisc = function editMisc(e) {
  e.preventDefault();
  sendAjax('POST', $("#editMiscForm").attr("action"), $("#editMiscForm").serialize(), function () {
    loadMiscFromServer();
  });
};

var EditMiscForm = function EditMiscForm(props) {
  /*#__PURE__*/
  React.createElement("form", {
    id: "editMiscForm",
    onSubmit: editMisc,
    name: "editMiscForm",
    action: "/miscNotes",
    method: "POST",
    className: "editMiscForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "miscTitle",
    type: "text",
    name: "title",
    placeholder: "Misc Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "miscnotes"
  }, "Setting Information: "), /*#__PURE__*/React.createElement("textarea", {
    id: "miscNotes",
    name: "miscnotes",
    form: "editMiscForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "editMisc",
    type: "submit",
    value: "Finish Editing"
  }));
};

var NewMiscForm = function NewMiscForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newMiscForm",
    onSubmit: handleMisc,
    name: "newMiscForm",
    action: "/miscNotes",
    method: "POST",
    className: "newMiscForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "miscTitle",
    type: "text",
    name: "title",
    placeholder: "Misc Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "miscnotes"
  }, "Setting Information: "), /*#__PURE__*/React.createElement("textarea", {
    id: "miscNotes",
    name: "miscnotes",
    form: "editMiscForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "createMisc",
    type: "submit",
    value: "Create"
  }));
}; // Can add images to here with an image tag
////// COPY NewForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at Nodes return div key...


var MiscList = function MiscList(props) {
  if (props.miscNotes.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "miscList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyMisc"
    }, "No misc notes created"));
  }

  var miscNodes = props.miscNotes.map(function (misc) {
    return /*#__PURE__*/React.createElement("div", {
      key: misc._id,
      className: "misc"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "miscTitle"
    }, " ", misc.title, " "), /*#__PURE__*/React.createElement("p", {
      className: "miscNotes"
    }, " Notes: ", misc.notes, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editMiscButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "miscList"
  }, miscNodes);
};

var loadMiscFromServer = function loadMiscFromServer() {
  sendAjax('GET', '/getMiscNotes', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MiscList, {
      miscNotes: data.miscNotes
    }), document.querySelector("#items"));
  });
};

var renderMisc = function renderMisc(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewMiscForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(MiscList, {
    miscNotes: []
  }), document.querySelector("#items"));
  loadMiscFromServer();
};
"use strict";

var popUpOpen = false;

var handlePlayer = function handlePlayer(e) {
  e.preventDefault();

  if ($("#playerName").val() == '' || $("#characterName").val() == '') {
    handleError("All fields are required for player doc creation (Can be editted later)");
    return false;
  }

  sendAjax('POST', $("#newPlayerForm").attr("action"), $("#newPlayerForm").serialize(), function () {
    loadPlayersFromServer();
  });
  return false;
};

var editPlayer = function editPlayer(e) {
  e.preventDefault();
  sendAjax('POST', $("#editPlayerForm").attr("action"), $("#editPlayerForm").serialize(), function () {
    loadPlayersFromServer();
  });
};

var EditPlayerForm = function EditPlayerForm(props) {
  /*#__PURE__*/
  React.createElement("form", {
    id: "editPlayerForm",
    onSubmit: editPlayer,
    name: "editPlayerForm",
    action: "/playerNotes",
    method: "POST",
    className: "editPlayerForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "playername"
  }, "Player name: "), /*#__PURE__*/React.createElement("input", {
    id: "playerName",
    type: "text",
    name: "playername",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "charactername"
  }, "Character Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "charactername",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterlevel"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "characterLevel",
    type: "text",
    name: "characterlevel",
    placeholder: "Level"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterhealth"
  }, "Health: "), /*#__PURE__*/React.createElement("input", {
    id: "characterHealth",
    type: "text",
    name: "characterhealth",
    placeholder: "Health"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterstats"
  }, "Stats: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterStats",
    name: "characterstats",
    form: "editCharacterForm",
    placeholder: "Stats"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characternotes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterNotes",
    name: "characternotes",
    form: "editCharacterForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "editPlayer",
    type: "submit",
    value: "Finish Editing"
  }));
};

var NewPlayerForm = function NewPlayerForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newPlayerForm",
    onSubmit: handlePlayer,
    name: "newPlayerForm",
    action: "/playerNotes",
    method: "POST",
    className: "newPlayerForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "playername"
  }, "Player name: "), /*#__PURE__*/React.createElement("input", {
    id: "playerName",
    type: "text",
    name: "playername",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "charactername"
  }, "Character Name: "), /*#__PURE__*/React.createElement("input", {
    id: "characterName",
    type: "text",
    name: "charactername",
    placeholder: "Name"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterlevel"
  }, "Level: "), /*#__PURE__*/React.createElement("input", {
    id: "characterLevel",
    type: "text",
    name: "characterlevel",
    placeholder: "Level"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterhealth"
  }, "Health: "), /*#__PURE__*/React.createElement("input", {
    id: "characterHealth",
    type: "text",
    name: "characterhealth",
    placeholder: "Health"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characterstats"
  }, "Stats: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterStats",
    name: "characterstats",
    form: "editCharacterForm",
    placeholder: "Stats"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "characternotes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "characterNotes",
    name: "characternotes",
    form: "editCharacterForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "createPlayer",
    type: "submit",
    value: "Create"
  }));
}; // Can add images to here with an image tag
////// COPY NewPlayerForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at playerNodes return div key...


var PlayerList = function PlayerList(props) {
  if (props.players.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "playerList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptyPlayer"
    }, "No players created"));
  }

  var playerNodes = props.players.map(function (player) {
    return /*#__PURE__*/React.createElement("div", {
      key: player._id,
      className: "player"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "playerName"
    }, " ", player.playername, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterName"
    }, " ", player.charactername), /*#__PURE__*/React.createElement("p", {
      className: "characterLevel"
    }, " Level: ", player.characterlevel, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterHealth"
    }, " Health: ", player.characterhealth, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterStats"
    }, " Stats: ", player.characterstats, " "), /*#__PURE__*/React.createElement("p", {
      className: "characterNotes"
    }, " Notes: ", player.notes, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editPlayerButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "playerList"
  }, playerNodes);
};

var loadPlayersFromServer = function loadPlayersFromServer() {
  sendAjax('GET', '/getPlayers', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(PlayerList, {
      players: data.players
    }), document.querySelector("#items"));
  });
};

var renderPlayers = function renderPlayers(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewPlayerForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(PlayerList, {
    players: []
  }), document.querySelector("#items"));
  loadPlayersFromServer();
};
"use strict";

var popUpOpen = false;

var handleSession = function handleSession(e) {
  e.preventDefault();

  if ($("#sessionTitle").val() == '' || $("#number").val() == '' || $("#notes").val() == '') {
    handleError("All fields are required for session creation (Can be editted later)");
    return false;
  }

  sendAjax('POST', $("#newSessionForm").attr("action"), $("#newSessionForm").serialize(), function () {
    loadSessionsFromServer();
  });
  return false;
};

var editSession = function editSession(e) {
  e.preventDefault();
  sendAjax('POST', $("#editSessionForm").attr("action"), $("#editSessionForm").serialize(), function () {
    loadSessionsFromServer();
  });
};

var EditSessionForm = function EditSessionForm(props) {
  /*#__PURE__*/
  React.createElement("form", {
    id: "editSessionForm",
    onSubmit: editSession,
    name: "editSessionForm",
    action: "/sessionNotes",
    method: "POST",
    className: "editSessionForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "sessionTitle",
    type: "text",
    name: "title",
    placeholder: "Session Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "number"
  }, "Session Number: "), /*#__PURE__*/React.createElement("input", {
    id: "number",
    type: "text",
    name: "number",
    placeholder: "Number"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "notes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "notes",
    name: "notes",
    form: "editSessionForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "editSession",
    type: "submit",
    value: "Finish Editing"
  }));
};

var NewSessionForm = function NewSessionForm(props) {
  return /*#__PURE__*/React.createElement("form", {
    id: "newSessionForm",
    onSubmit: handleSession,
    name: "newSessionForm",
    action: "/sessionNotes",
    method: "POST",
    className: "newSessionForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "sessionTitle",
    type: "text",
    name: "title",
    placeholder: "Session Title"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "number"
  }, "Session Number: "), /*#__PURE__*/React.createElement("input", {
    id: "number",
    type: "text",
    name: "number",
    placeholder: "Number"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "notes"
  }, "Notes: "), /*#__PURE__*/React.createElement("textarea", {
    id: "notes",
    name: "notes",
    form: "editSessionForm",
    placeholder: "Notes"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "_csrf",
    value: props.csrf
  }), /*#__PURE__*/React.createElement("input", {
    className: "createSession",
    type: "submit",
    value: "Finish Editing"
  }));
}; // Can add images to here with an image tag
////// COPY NewSessionForm AND ADD IT TO HERE FOR THE EDIT BUTTON
///// at sessionNodes return div key...


var SessionList = function SessionList(props) {
  if (props.sessions.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      className: "sessionList"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "emptySession"
    }, "No sessions created"));
  }

  var sessionNodes = props.sessions.map(function (session) {
    return /*#__PURE__*/React.createElement("div", {
      key: session._id,
      className: "session"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "sessionTitle"
    }, " ", session.title, " "), /*#__PURE__*/React.createElement("p", {
      className: "sessionGameSystem"
    }, " Game System: ", session.gamesystem, " "), /*#__PURE__*/React.createElement("p", {
      className: "sessionSettingInfo"
    }, " Setting Info: ", session.settinginfo, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editSessionButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "sessionList"
  }, sessionNodes);
};

var loadSessionsFromServer = function loadSessionsFromServer() {
  sendAjax('GET', '/getSessions', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(SessionList, {
      sessions: data.sessions
    }), document.querySelector("#items"));
  });
};

var renderSessions = function renderSessions(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewSessionForm, {
    csrf: csrf
  }), document.querySelector("#notes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(SessionList, {
    sessions: []
  }), document.querySelector("#items"));
  loadSessionsFromServer();
};
"use strict";

var handleError = function handleError(message) {
  $("#errorMessage").text(message);
};

var redirect = function redirect(response) {
  window.location = response.redirect;
};

var sendAjax = function sendAjax(type, action, data, success) {
  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    success: success,
    error: function error(xhr, status, _error) {
      var messageObj = JSON.parse(xhr.responseText);
      handleError(messageObj.error);
    }
  });
};
