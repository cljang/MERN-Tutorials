import React, {useState} from "react";
import { connect } from "react-redux";
import { retrieveTutorials, findTutorialsByTitle, deleteAllTutorials } from "../actions/tutorials";



function TutorialList() {
  const [ state, setState ] = useState({
    id: null,
    title: "",
    description: "",
    published: false,

    submitted: false,
  })

  return <div>TutorialList</div>;
}

export default TutorialList;
