import React from 'react';

function CommandEditor({ command, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  return (
    <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px" }}>
      <label><strong>type:</strong> {command.type}</label>
      <br />
      {Object.entries(command).map(([key, value]) => {
        if (key === 'type') return null;

        return (
          <div key={key} style={{ marginTop: "5px" }}>
            <label>{key}:</label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleChange(key, e.target.value)}
              style={{ marginLeft: "5px" }}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CommandEditor;
