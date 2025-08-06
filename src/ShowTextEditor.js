import React from 'react';

const ShowTextEditor = ({ command, onChange }) => {
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
          value={command.character || "ナギサ"}
          onChange={(e) => handleChange("character", e.target.value)}
        >
          <option value="ナギサ">ナギサ</option>
          <option value="ヒイロ">ヒイロ</option>
        </select>
      </div>

      {/* text */}
      <div style={{ marginTop: "10px" }}>
        <label>text: </label>
        <input
          type="text"
          value={command.text}
          onChange={(e) => handleChange("text", e.target.value)}
          placeholder="セリフを入力"
          style={{ width: "100%" }}
        />
      </div>

      {/* text_speed */}
      <div style={{ marginTop: "10px" }}>
        <label>text_speed: </label>
        <input
          type="number"
          step="0.01"
          value={command.text_speed}
          onChange={(e) => handleChange("text_speed", parseFloat(e.target.value))}
        />
      </div>

        {/* wait_for_click */}
        <div style={{ marginTop: "10px" }}>
        <label>wait_for_click: </label>
        <div style={{ marginTop: "5px" }}>
            <button
            onClick={() => handleChange("wait_for_click", true)}
            style={{
                backgroundColor: command.wait_for_click ? "green" : "#eee",
                color: command.wait_for_click ? "white" : "black",
                marginRight: "5px"
            }}
            >
            true
            </button>
            <button
            onClick={() => handleChange("wait_for_click", false)}
            style={{
                backgroundColor: command.wait_for_click === false ? "red" : "#eee",
                color: command.wait_for_click === false ? "white" : "black",
                marginRight: "5px"
            }}
            >
            false
            </button>
        </div>
        </div>


      {/* text_ui */}
      <div style={{ marginTop: "10px" }}>
        <label>text_ui: </label>
        <select
          value={command.text_ui || "fukidashi_nagisa"}
          onChange={(e) => handleChange("text_ui", e.target.value)}
        >
          <option value="fukidashi_nagisa">fukidashi_nagisa</option>
          <option value="fukidashi_hiro">fukidashi_hiro</option>
        </select>
      </div>
    </div>
  );
};

export default ShowTextEditor;
