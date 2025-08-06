// components/editors/ChoiceEditor.jsx

import React from 'react';

const ChoiceEditor = ({ command, onChange }) => {
  // choicesが存在しないか、2つない場合に初期化
  const fixedChoices = command.choices?.length === 2
    ? command.choices
    : [{ text: "", next: "" }, { text: "", next: "" }];

  const handleChoiceChange = (index, key, value) => {
    const newChoices = [...fixedChoices];
    newChoices[index][key] = value;
    onChange({ ...command, choices: newChoices });
  };

  return (
    <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      {[0, 1].map((i) => (
        <div key={i} style={{
          border: "1px solid #ccc",
          borderRadius: "6px",
          padding: "8px",
          marginBottom: "10px",
          backgroundColor: "#f9f9f9"
        }}>
          <h4>選択肢 {i + 1}</h4>
          <div style={{ marginBottom: "5px" }}>
            <label>text:</label>
            <input
              type="text"
              value={fixedChoices[i].text}
              onChange={(e) => handleChoiceChange(i, "text", e.target.value)}
              style={{ marginLeft: "5px", width: "80%" }}
            />
          </div>
          <div>
            <label>next:</label>
            <input
              type="text"
              value={fixedChoices[i].next}
              onChange={(e) => handleChoiceChange(i, "next", e.target.value)}
              style={{ marginLeft: "5px", width: "80%" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};


export default ChoiceEditor;
