// components/editors/PlaySeEditor.jsx

import React from 'react';

const PlaySeEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
        <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      <div style={{ marginBottom: "5px" }}>
        <label>se:</label>
        <input
          type="text"
          value={command.se || ""}
          onChange={(e) => handleChange("se", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "5px" }}>
        <label>se_volume:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={command.se_volume ?? 1.0}
          onChange={(e) => handleChange("se_volume", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "5px" }}>
        <label>delay:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={command.delay ?? 0}
          onChange={(e) => handleChange("delay", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default PlaySeEditor;
