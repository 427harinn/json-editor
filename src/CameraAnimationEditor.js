// components/editors/CameraAnimationEditor.jsx

import React from 'react';

const CameraAnimationEditor = ({ command, onChange }) => {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
      <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      {/* camera_animation */}
      <div style={{ marginBottom: "5px" }}>
        <label>camera_animation:</label>
        <input
          type="text"
          value={command.camera_animation || ""}
          onChange={(e) => handleChange("camera_animation", e.target.value)}
          style={{ marginLeft: "5px" }}
        />
      </div>

      {/* camera_duration */}
      <div style={{ marginBottom: "5px" }}>
        <label>camera_duration:</label>
        <input
          type="number"
          step="0.1"
          min="0"
          value={command.camera_duration ?? ""}
          onChange={(e) => handleChange("camera_duration", parseFloat(e.target.value))}
          style={{ marginLeft: "5px" }}
        />
      </div>
    </div>
  );
};

export default CameraAnimationEditor;
