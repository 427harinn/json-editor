// components/editors/PlayBgmEditor.jsx

import React from 'react';

const PlayBgmEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
      <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      <div style={{ marginBottom: "5px" }}>
        <label>bgm:</label>
        <input
          type="text"
          value={command.bgm || ""}
          onChange={(e) => handleChange("bgm", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "5px" }}>
        <label>fade:</label>
        <select
          value={command.fade || ""}
          onChange={(e) => handleChange("fade", e.target.value)}
          style={{ marginLeft: "5px" }}
        >
          <option value="">なし</option>
          <option value="in">in</option>
          <option value="out">out</option>
        </select>
      </div>

      <div style={{ marginBottom: "5px" }}>
        <label>fade_time:</label>
        <input
          type="number"
          step="0.1"
          value={command.fade_time ?? 1.0}
          onChange={(e) => handleChange("fade_time", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>

      <div style={{ marginBottom: "5px" }}>
        <label>bgm_volume:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          max="1"
          value={command.bgm_volume ?? 1.0}
          onChange={(e) => handleChange("bgm_volume", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default PlayBgmEditor;
