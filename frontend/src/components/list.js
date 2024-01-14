import React from "react";

export default function List(props) {
  function handleClick() {
    props.deletion(props.id);
  }
  return (
    <div className="note">
      <h1> Title: {props.title} </h1>
      <button onClick={handleClick}>Delete</button>
    </div>
  );
}
