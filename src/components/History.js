import React from "react";
import "../index.css";

export default ({ history, stepNumber, onClick }) => (
  <ol>
    {history.map((_, moveIndex) => (
      <li key={moveIndex}>
        {
          <button
            disabled={stepNumber === moveIndex}
            onClick={() => onClick(moveIndex)}
          >
            {moveIndex
              ? `Go to move number ${moveIndex + 1}. Move location: (${
                  history[moveIndex].moveLocation.row
                }, ${history[moveIndex].moveLocation.column})`
              : "Go to game start"}
          </button>
        }
      </li>
    ))}
  </ol>
);
