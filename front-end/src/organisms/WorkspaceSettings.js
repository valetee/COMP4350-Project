import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { ExitIcon, AddCollab } from "../atoms/icons";
import CollaboratorItem from "../molecules/CollaboratorItem";
import Button from "../atoms/Button";
import "./WorkspaceSettings.css";


function WorkspaceSettings({onChangeVisibility}) {
  const componentName = "WorkspaceSettings";

  const [renderedName, setRenderedName] = useState("");
  const [renderedCollaborators, setRenderedCollaborators] = useState([]);

  // formats a list of strings to a list of object contains {email, pending}
  const formatCollaborators = (list) =>
    list.map((i) => ({email: i, pending: false}));
  

  useEffect(() => { 
    // FETCH DATA Calls here
    // (data we need: list of collaborators, workspace name, and workspaceid)
    // we need workspaceid for patching later.
    

    // then Convert workspace data to a format we want

    const fakeFormattedWorkspaceData = {
      name: "My workspace",
      collaborators: ["email1@email.com", "email2@email.com", "email2@email.com", "email2@email.com"],
      id: "1"
    };

    setRenderedCollaborators(formatCollaborators(fakeFormattedWorkspaceData.collaborators));
    setRenderedName(fakeFormattedWorkspaceData.name);

  }, []);

  const handleBackgroundClick = (e) => {
    // clicked outside of modal
    if(e.target.className == `${componentName}-background`) {
      onChangeVisibility(false);
    }
  };

  const handleExitClick = () => {
    onChangeVisibility(false);
  };

  const handleRemoveCollaborator = (email) => {
    console.log("Remove this collaborator: ", email);
  };

  const renderColaboratorList = () => 
    renderedCollaborators.map(
      (col) => <CollaboratorItem key={Math.random()} email={col.email} onRemove={handleRemoveCollaborator}/>
    );

  const addCollaboratorElement = <div className={`${componentName}-add-collab`}>
    <div className={`${componentName}-add-collab-top`}>
      <span className={`${componentName}-add-collab-label`}>Share with others:</span>
    </div>
    <div className={`${componentName}-add-collab-bottom`}>
      <input className={`${componentName}-add-collab-input`} type="text" placeholder="Enter collaborator's email"/>
      <AddCollab className={`${componentName}-add-collab-icon`}/>
    </div>
  </div>;
  

  return (
    <div className={`${componentName}-background`} onClick={handleBackgroundClick}>
      <div className={`${componentName}`}>
        <div className={`${componentName}-top`}>
          <div className={`${componentName}-top-pad`}/>
          <ExitIcon className={`${componentName}-exit`} onClick={handleExitClick}/>
        </div>
        
        <div className={`${componentName}-header`}>
          {renderedName}
        </div>
        <div className={`${componentName}-body`}>
          {addCollaboratorElement}
          <div className={`${componentName}-collab-list`}>
            {renderColaboratorList()}
          </div>
        </div>
        <div className={`${componentName}-footer`}>
          <div className={`${componentName}-footer-pad`}/>
          <div className={`${componentName}-save`}>
            <Button label="Save"/>
          </div>
        </div>
      </div>
    </div>
  );

}

WorkspaceSettings.propTypes = {
  onChangeVisibility: PropTypes.func.isRequired,
};

export default WorkspaceSettings;