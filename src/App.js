import React, { useState, useEffect, useRef } from 'react';
import CommandEditor from './CommandEditor';


function App() {
  const [jsonData, setJsonData] = useState(null);
  const COMMAND_TYPE_ORDER = [
  "show_text",
  "show_character",
  "set_background",
  "play_bgm",
  "play_se",
  "show_effect",
  "hide_effect",
  "camera_animation",
  "fade",
  "choice",
  "next"
];
// コマンドテンプレート
const COMMAND_TEMPLATES = {
  show_text: {
    type: "show_text",
    character: "",
    text: "",
    text_speed: 0.05,
    wait_for_click: true,
    text_ui: ""
  },
  show_character: {
    type: "show_character",
    character: "",
    position: "",
    motion: "",
    is_speaking: false,
    replace: true
  },
  set_background: {
    type: "set_background",
    background: ""
  },
  play_bgm: {
    type: "play_bgm",
    bgm: "",
    fade: "",
    fade_time: 1.0,
    bgm_volume: 1.0
  },
  play_se: {
    type: "play_se",
    se: "",
    se_volume: 1.0,
    delay: 0
  },
  show_effect: {
    type: "show_effect",
    effect: "",
    effect_position: "",
    duration: 1.0,
    loop: false,
    id: ""
  },
  hide_effect: {
    type: "hide_effect",
    id: ""
  },
  camera_animation: {
    type: "camera_animation",
    camera_animation: "",
    camera_duration: 1.0
  },
  fade: {
    type: "fade",
    prefab: "",
    wait: true
  },
  choice: {
    type: "choice",
    choices: [
      {
        text: "",
        next: ""
      }
    ]
  },
  next: {
    type: "next",
    mode: "",
    next_target: ""
  }
};


  // ファイル選択時に呼ばれる関数
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        setJsonData(parsed);
      } catch (error) {
        alert("JSONの読み込みに失敗しました。形式が正しいか確認してください。");
      }
    };
    reader.readAsText(file);
  };
  // 編集済みJSONをダウンロードする関数
  const handleDownload = () => {
    if (!jsonData) return;

    // 空のステップ（commandsが空）を除いた新しいデータを作成
    const filteredItems = jsonData.items.filter(
      (step) => step.commands && step.commands.length > 0
    );

    const cleanedData = {
      ...jsonData,
      items: filteredItems
    };

    const blob = new Blob([JSON.stringify(cleanedData, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'edited.json';
    link.click();
  };

  // ステップを挿入する関数
  const insertStepAt = (index) => {
    const newData = { ...jsonData };
    const newStep = {
      commands: [] // 空のコマンド配列
    };
    newData.items.splice(index, 0, newStep); // indexに挿入
    setJsonData(newData);
  };
  // ステップを削除する関数
  const deleteStepAt = (index) => {
    if (jsonData.items.length <= 1) {
      alert("ステップは1つ以上必要です！");
      return;
    }

    const newData = { ...jsonData };
    newData.items.splice(index, 1); // 指定したindexを削除
    setJsonData(newData);
  };
  // ステップ名を決定する関数
  const getStepTitle = (item) => {
    const textCommand = item.commands.find(cmd => cmd.type === "show_text");
    if (textCommand && textCommand.text) {
      const trimmed = textCommand.text.length > 15
        ? textCommand.text.slice(0, 15) + "..."
        : textCommand.text;
      return `「${trimmed}」`;
    }
    return "（テキストなし）";
  };
  // コマンドを削除する関数
  const deleteCommandAt = (stepIndex, commandIndex) => {
    const newData = { ...jsonData };
    newData.items[stepIndex].commands.splice(commandIndex, 1);
    setJsonData(newData);
  };

  const [lastAddedCommandId, setLastAddedCommandId] = useState(null);

    useEffect(() => {
    if (lastAddedCommandId) {
      const timer = setTimeout(() => {
        setLastAddedCommandId(null);
      }, 5000); // 3秒で解除
      return () => clearTimeout(timer);
    }
  }, [lastAddedCommandId]);



  





  return (
    <div style={{ padding: "20px" }}>
      <h1>ノベルゲーム JSON エディタ</h1>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      {jsonData && (
        <div style={{ marginTop: "20px" }}>
          <h2>読み込んだJSONデータ：</h2>

          {jsonData.items.map((item, itemIndex) => (
            <div key={itemIndex} style={{ marginBottom: "30px", padding: "10px", border: "1px solid #ccc" }}>
              
              {/* ステップ前に挿入するボタン */}

              <button
                onClick={() => insertStepAt(itemIndex)}
                style={{ marginBottom: "10px", backgroundColor: "#d3f8d3" }}
              >
                ＋ このステップの前にステップを追加
              </button>
              <button
                onClick={() => deleteStepAt(itemIndex)}
                style={{
                  marginTop: "10px",
                  backgroundColor: "#fdd",
                  color: "#900",
                  border: "1px solid #900"
                }}
              >
                − このステップを削除
            </button>
              <h3>ステップ {itemIndex + 1}: {getStepTitle(item)}</h3>


            {item.commands
              .map((command, originalIndex) => ({ command, originalIndex }))
              .sort((a, b) => {
                const indexA = COMMAND_TYPE_ORDER.indexOf(a.command.type);
                const indexB = COMMAND_TYPE_ORDER.indexOf(b.command.type);
                return indexA - indexB;
              })
              .map(({ command, originalIndex }, sortedIndex) => (
              <div
                key={sortedIndex}
                style={{
                  position: "relative",
                  border: command.__id === lastAddedCommandId
                    ? "2px solid #fbc02d" // 目立つ黄色
                    : "1px dashed #ccc",  // 通常の枠
                  marginBottom: "10px",
                  padding: "10px",
                  borderRadius: "6px",
                  transition: "border 0.5s ease"
                }}
              >

                

                  <CommandEditor
                    command={command}
                    onChange={(updatedCommand) => {
                      const newData = { ...jsonData };
                      newData.items[itemIndex].commands[originalIndex] = updatedCommand;
                      setJsonData(newData);
                    }}
                  />
                  <button
                    onClick={() => deleteCommandAt(itemIndex, originalIndex)}
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "#fdd",
                      color: "#900",
                      border: "1px solid #900",
                      padding: "2px 8px"
                    }}
                  >
                    ✕
                  </button>
                </div>
            ))}

            {/* コマンド追加フォーム */}
            <div style={{ marginTop: "10px" }}>
              <select
                value=""
                onChange={(e) => {
                  const selectedType = e.target.value;
                  if (!selectedType) return;

                  const newCommand = {
                    ...COMMAND_TEMPLATES[selectedType],
                    __id: crypto.randomUUID?.() || Math.random().toString(36).substr(2, 9) // 識別用
                  };
                  setLastAddedCommandId(newCommand.__id);


                  const newData = { ...jsonData };
                  newData.items[itemIndex].commands.push(newCommand);
                  setJsonData(newData);
                }}
              >
                <option value="">＋ コマンドを選んで追加</option>
                {COMMAND_TYPE_ORDER.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>



            </div>
            
            
          ))}
          <button
            onClick={() => insertStepAt(jsonData.items.length)}
            style={{ marginTop: "20px", backgroundColor: "#d3f8d3" }}
          >
            ＋ 一番最後にステップを追加
          </button>
        </div>
      )}
      <button onClick={handleDownload} style={{ marginTop: '20px' }}>
        編集済みJSONをダウンロード
      </button>

    </div>
  );
}

export default App;
