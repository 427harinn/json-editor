// components/editors/ShowEffectEditor.jsx

import React from 'react';

const ShowEffectEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
      <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
        
      {/* effect */}
      <div style={{ marginBottom: "5px" }}>
        <label>effect:</label>
        <input
          type="text"
          value={command.effect || ""}
          onChange={(e) => handleChange("effect", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>

      {/* effect_position */}
      <div style={{ marginBottom: "5px" }}>
        <label>effect_position:</label>
        <select
          value={command.effect_position || "center"}
          onChange={(e) => handleChange("effect_position", e.target.value)}
          style={{ marginLeft: "5px" }}
        >
          <option value="center">center</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>

      {/* duration */}
      <div style={{ marginBottom: "5px" }}>
        <label>duration:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={command.duration ?? 0}
          onChange={(e) => handleChange("duration", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>

      {/* loop */}
      <div style={{ marginBottom: "5px" }}>
        <label>loop:</label>
        <button
          onClick={() => handleChange("loop", true)}
          style={{
            backgroundColor: command.loop ? "green" : "#eee",
            color: command.loop ? "white" : "black",
            marginLeft: "5px",
            marginRight: "5px"
          }}
        >
          true
        </button>
        <button
          onClick={() => handleChange("loop", false)}
          style={{
            backgroundColor: !command.loop ? "red" : "#eee",
            color: !command.loop ? "white" : "black"
          }}
        >
          false
        </button>
      </div>

      {/* id */}
      <div style={{ marginBottom: "5px" }}>
        <label>id:</label>
        <input
          type="text"
          value={command.id || ""}
          onChange={(e) => handleChange("id", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default ShowEffectEditor;
