import React, {useState} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { retrieveTutorials, findTutorialsByTitle, deleteAllTutorials } from "../actions/tutorials";



function TutorialsList(props) {
  const [ state, setState ] = useState({
    currentTutorial: null,
    currentIndex: -1,
    searchTitle: "",
  })

  function componentDidMount() {
    props.retrieveTutorials();
  }

  function onChangeSearchTitle(event) {
    const searchTitle = event.target.value;

    setState(prevValue => ({
      ...prevValue,
      searchTitle: searchTitle,
    }));
  }

  function refreshData() {
    setState(prevValue => ({
      ...prevValue,
      currentTutorial: null,
      currentIndex: -1,
    }));
  }

  function setActiveTutorial(tutorial, index) {
    setState(prevValue => ({
      ...prevValue,
      currentTutorial: tutorial,
      currentIndex: index,
    }));
  }

  function removeAllTutorials() {
    props
      .deleteAllTutorials()
      .then((response) => {
        console.log(response);
        refreshData();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function findByTitle() {
    refreshData();

    props.findTutorialsByTitle(state.searchTitle);
  }

  return (
    <div className="list row">
      <div className="col-md-8">
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by title"
            value={state.searchTitle}
            onChange={onChangeSearchTitle}
          />
            <button
              className="btn btn-outline-secondary"
              type="button"
              onClick={findByTitle}
            >
              Search
            </button>
        </div>
      </div>
        <div className="col-md-6">
          <h4>Tutorials List</h4>

          <ul className="list-group">
            {props &&
              props.tutorials.map((tutorial, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === state.currentIndex ? "active" : "")
                  }
                  onClick={() => setActiveTutorial(tutorial, index)}
                  key={index}
                >
                  {tutorial.title}
                </li>
              ))}
          </ul>

          <button
            className="mt-3 btn btn-sm btn-danger"
            onClick={removeAllTutorials}
          >
            Delete All
          </button>
        </div>
      <div className="col-md-6">
        {state.currentTutorial ? (
          <div>
            <h4>Tutorial</h4>
            <div>
              <label>
                <strong>Title:</strong>
              </label>{" "}
              {state.currentTutorial.title}
            </div>
            <div>
              <label>
                <strong>Description:</strong>
              </label>{" "}
              {state.currentTutorial.description}
            </div>
            <div>
              <label>
                <strong>Status:</strong>
              </label>{" "}
              {state.currentTutorial.published ? "Published" : "Pending"}
            </div>

            <Link
              to={"/tutorials/" + state.currentTutorial.id}
              className="badge badge-warning"
            >
              Edit
            </Link>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a Tutorial...</p>
          </div>
        )}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    tutorials: state.tutorials,
  };
};

export default connect(mapStateToProps, { retrieveTutorials, findTutorialsByTitle, deleteAllTutorials })(TutorialsList);
