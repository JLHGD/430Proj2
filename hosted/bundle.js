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
  /*#__PURE__*/
  React.createElement("form", {
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
    }), document.querySelector("#campaigns"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCampaignForm, {
    csrf: csrf
  }), document.querySelector("#campaignNotes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CampaignList, {
    campaigns: []
  }), document.querySelector("#campaigns"));
  loadCampaignsFromServer();
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
    onSubmit: editCahracter,
    name: "editCharacterForm",
    action: "/characterNotes",
    method: "POST",
    className: "editCharacterForm"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "characterTitle",
    type: "text",
    name: "title",
    placeholder: "Character Title"
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
    form: "editCharacterForm",
    placeholder: "Setting Information"
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
    htmlFor: "title"
  }, "Title: "), /*#__PURE__*/React.createElement("input", {
    id: "characterTitle",
    type: "text",
    name: "title",
    placeholder: "Character Title"
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
    form: "newCharacterForm",
    placeholder: "Setting Information"
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
      className: "emptyCCharacter"
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

var loadCharacterFromServer = function loadCharacterFromServer() {
  sendAjax('GET', '/getCharacters', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
      character: data.characters
    }), document.querySelector("#characters"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCharacterForm, {
    csrf: csrf
  }), document.querySelector("#characterNotes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CharacterList, {
    characters: []
  }), document.querySelector("#characters"));
  loadCharactersFromServer();
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

var handleMisc = function handleMisc(e) {
  e.preventDefault();

  if ($("#miscTitle").val() == '' || $("#gameSystem").val() == '' || $("#settingInfo").val() == '') {
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
    form: "editMiscForm",
    placeholder: "Setting Information"
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
    form: "newMiscForm",
    placeholder: "Setting Information"
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
      className: "miscGameSystem"
    }, " Game System: ", misc.gamesystem, " "), /*#__PURE__*/React.createElement("p", {
      className: "miscSettingInfo"
    }, " Setting Info: ", misc.settinginfo, " "), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "editMiscButton"
    }, "Edit"));
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "miscList"
  }, miscNodes);
};

var loadMiscFromServer = function loadMiscFromServer() {
  sendAjax('GET', '/getMisc', null, function (data) {
    ReactDOM.render( /*#__PURE__*/React.createElement(MiscList, {
      miscNotes: data.miscNotes
    }), document.querySelector("#miscsNotes"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewMiscForm, {
    csrf: csrf
  }), document.querySelector("#miscNotesForm"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CMiscList, {
    miscNotes: []
  }), document.querySelector("#miscsNotes"));
  loadMiscFromServer();
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
  /*#__PURE__*/
  React.createElement("form", {
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
    }), document.querySelector("#campaigns"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCampaignForm, {
    csrf: csrf
  }), document.querySelector("#campaignNotes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CampaignList, {
    campaigns: []
  }), document.querySelector("#campaigns"));
  loadCampaignsFromServer();
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
  /*#__PURE__*/
  React.createElement("form", {
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
    }), document.querySelector("#campaigns"));
  });
};

var setup = function setup(csrf) {
  ReactDOM.render( /*#__PURE__*/React.createElement(NewCampaignForm, {
    csrf: csrf
  }), document.querySelector("#campaignNotes"));
  ReactDOM.render( /*#__PURE__*/React.createElement(CampaignList, {
    campaigns: []
  }), document.querySelector("#campaigns"));
  loadCampaignsFromServer();
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
