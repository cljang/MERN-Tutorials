import React, { useState } from "react";
import { connect } from "react-redux";
import { createTutorial } from "../actions/tutorials";

function AddTutorial(props) {
  const [ state, setState ] = useState({
    id: null,
    title: "",
    description: "",
    published: false,

    submitted: false,
  })

  function onChangeTitle(event) {
    setState(prevValue =>({
      ...prevValue,
      title: event.target.value,
    }));
  }

  function onChangeDescription(event) {
    setState(prevValue =>({
      ...prevValue,
      description: event.target.value,
    }));
  }

  function saveTutorial() {
    const { title, description } = state;

    props.createTutorial(title, description)
      .then((data) => {
        setState({
          id: data.id,
          title: data.title,
          description: data.description,
          published: data.published,

          submitted: true,
        });
        console.log(data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function newTutorial() {
    setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false,
    });
  }

  return (
    <div className="submit-form">
      {state.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button className="btn btn-success" onClick={newTutorial}>
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={state.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              required
              value={state.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>

          <button onClick={saveTutorial} className="btn btn-success">
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default connect(null, { createTutorial })(AddTutorial);
