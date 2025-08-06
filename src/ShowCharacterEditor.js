import React from 'react';

const ShowCharacterEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
    <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>

      {/* character */}
      <div style={{ marginTop: "10px" }}>
        <label>character: </label>
        <select
          value={command.character || "nagisa_Live2D"}
          onChange={(e) => handleChange("character", e.target.value)}
        >
          <option value="nagisa_Live2D">nagisa_Live2D</option>
          <option value="hiro_Live2D">hiro_Live2D</option>
        </select>
      </div>

      {/* position */}
      <div style={{ marginTop: "10px" }}>
        <label>position: </label>
        <select
          value={command.position || "center"}
          onChange={(e) => handleChange("position", e.target.value)}
        >
          <option value="center">center</option>
          <option value="left">left</option>
          <option value="right">right</option>
        </select>
      </div>

      {/* motion */}
      <div style={{ marginTop: "10px" }}>
        <label>motion: </label>
        <input
          type="text"
          value={command.motion || "nagisa_tu_1"}
          onChange={(e) => handleChange("motion", e.target.value)}
        />
      </div>

      {/* is_speaking */}
      <div style={{ marginTop: "10px" }}>
        <label>is_speaking: </label>
        <button
          onClick={() => handleChange("is_speaking", true)}
          style={{
            backgroundColor: command.is_speaking ? "green" : "#eee",
            color: command.is_speaking ? "white" : "black",
            marginRight: "5px"
          }}
        >
          true
        </button>
        <button
          onClick={() => handleChange("is_speaking", false)}
          style={{
            backgroundColor: !command.is_speaking ? "red" : "#eee",
            color: !command.is_speaking ? "white" : "black"
          }}
        >
          false
        </button>
      </div>

      {/* replace */}
      <div style={{ marginTop: "10px" }}>
        <label>replace: </label>
        <button
          onClick={() => handleChange("replace", true)}
          style={{
            backgroundColor: command.replace ? "green" : "#eee",
            color: command.replace ? "white" : "black",
            marginRight: "5px"
          }}
        >
          true
        </button>
        <button
          onClick={() => handleChange("replace", false)}
          style={{
            backgroundColor: !command.replace ? "red" : "#eee",
            color: !command.replace ? "white" : "black"
          }}
        >
          false
        </button>
      </div>
    </div>
  );
};

export default ShowCharacterEditor;
