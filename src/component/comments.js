import React from "react";

const Comments = (props) => {
  return (
    <ul style={{ display: "flex", justifyContent: "center" }}>
      <li>
        {props.index}={props.text}{" "}
        <button onClick={() => props.onEdit()}>
          edit
        </button>
        <button
          onClick={() => {
            props.onSelect(props.index);
          }}
        >
          Delete
        </button>
      </li>
    </ul>
  );
};

export default Comments;
