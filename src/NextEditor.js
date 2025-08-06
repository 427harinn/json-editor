import React from 'react';

const NextEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
    <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>

      {/* mode */}
      <div style={{ marginTop: "10px" }}>
        <label>mode: </label>
        <select
          value={command.mode || "scene"}
          onChange={(e) => handleChange("mode", e.target.value)}
        >
          <option value="scene">scene</option>
          <option value="game">game</option>
        </select>
      </div>

      {/* next_target */}
      <div style={{ marginTop: "10px" }}>
        <label>next_target: </label>
        <input
          type="text"
          value={command.next_target || ""}
          onChange={(e) => handleChange("next_target", e.target.value)}
        />
      </div>
    </div>
  );
};

export default NextEditor;
