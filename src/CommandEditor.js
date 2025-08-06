import React from 'react';
import ShowTextEditor from './ShowTextEditor';
import ShowCharacterEditor from './ShowCharacterEditor';
import PlayBgmEditor from './PlayBgmEditor';
import PlaySeEditor from './PlaySeEditor';
import ShowEffectEditor from './ShowEffectEditor';
import CameraAnimationEditor from './CameraAnimationEditor';
import FadeEditor from './FadeEditor';
import ChoiceEditor from './ChoiceEditor';
import NextEditor from './NextEditor';


function CommandEditor({ command, onChange }) {
  const handleChange = (key, value) => {
    onChange({ ...command, [key]: value });
  };

  // show_text の場合は専用UIを使う
  if (command.type === "show_text") {
    return <ShowTextEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'show_character') {
    return <ShowCharacterEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'play_bgm') {
    return <PlayBgmEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'play_se') {
    return <PlaySeEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'show_effect') {
    return <ShowEffectEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'camera_animation') {
    return <CameraAnimationEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'fade') {
    return <FadeEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'choice') {
    return <ChoiceEditor command={command} onChange={onChange} />;
  }
  if (command.type === 'next') {
    return <NextEditor command={command} onChange={onChange} />;
  }

  // それ以外は従来の汎用UI
  return (
    <div style={{ marginBottom: "10px", background: "#f4f4f4", padding: "10px", borderRadius: "6px" }}>
      <label><strong>type:</strong> {command.type}</label>
      <br />
      {Object.entries(command).map(([key, value]) => {
        if (key === 'type' || key === '__id') return null;

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
