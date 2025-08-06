// components/editors/FadeEditor.jsx

import React from 'react';

const FadeEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
      <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      {/* prefab */}
      <div style={{ marginBottom: "5px" }}>
        <label>prefab:</label>
        <input
          type="text"
          value={command.prefab || ""}
          onChange={(e) => handleChange("prefab", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>

      {/* wait */}
      <div style={{ marginBottom: "5px" }}>
        <label>wait:</label>
        <button
          onClick={() => handleChange("wait", true)}
          style={{
            backgroundColor: command.wait ? "green" : "#eee",
            color: command.wait ? "white" : "black",
            marginLeft: "5px",
            marginRight: "5px"
          }}
        >
          true
        </button>
        <button
          onClick={() => handleChange("wait", false)}
          style={{
            backgroundColor: !command.wait ? "red" : "#eee",
            color: !command.wait ? "white" : "black"
          }}
        >
          false
        </button>
      </div>
    </div>
  );
};

export default FadeEditor;
