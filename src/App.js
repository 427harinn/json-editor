import React, { useState, useEffect, useRef } from 'react';
import CommandEditor from './CommandEditor';


function App() {
  const [jsonData, setJsonData] = useState(null);
  const lastAddedRef = useRef(null);
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
    character: "ナギサ", // デフォルトキャラ
    text: "",
    text_speed: 0.05, // デフォルトのテキスト速度
    wait_for_click: true, // クリック待ちしない
    text_ui:"fukidashi_nagisa"
  },
  show_character: {
    type: "show_character",
    character: "nagisa_Live2D",     // デフォルトキャラ
    position: "center",             // デフォルト位置
    motion: "nagisa_tu_1",          // デフォルトモーション
    is_speaking: true,              // 発話中
    replace: false                  // 置き換えない
  },
  set_background: {
    type: "set_background",
    background: "clear"
  },
  play_bgm: {
    type: "play_bgm",
    bgm: "",           // 手動入力
    fade: "",          // "in", "out", ""（空欄）
    fade_time: 1.0,    // 数値入力、デフォルト1.0
    bgm_volume: 1.0    // 数値入力、デフォルト1.0
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
    effect_position: "center",
    duration: 0,
    loop: true,
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
    mode: "scene",
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
    const filteredItems = jsonData.items
      .filter((step) => step.commands && step.commands.length > 0)
      .map((step) => ({
        commands: step.commands.map(({ __id, ...rest }) => rest) // __id を除外
      }));

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
      // スクロール
      const scrollTimer = setTimeout(() => {
        lastAddedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);

      // 3秒後にハイライト解除
      const fadeTimer = setTimeout(() => {
        setLastAddedCommandId(null);
      }, 3000);

      return () => {
        clearTimeout(scrollTimer);
        clearTimeout(fadeTimer);
      };
    }
  }, [lastAddedCommandId]);





  





  return (
    <div style={{ padding: "20px" }}>
      <h1>ノベルゲーム JSON エディタ</h1>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      {jsonData && (
        <div style={{ marginTop: "20px" }}>
          <button onClick={handleDownload} style={{ marginTop: '20px' }}>
            編集済みJSONをダウンロード
          </button>
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
                ref={command.__id === lastAddedCommandId ? lastAddedRef : null}
                style={{
                  position: "relative",
                  border: command.__id === lastAddedCommandId
                    ? "2px solid #fbc02d"
                    : "1px dashed #ccc",
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


                  const newData = { ...jsonData };
                  newData.items[itemIndex].commands.push(newCommand);
                  setJsonData(newData);
                  setLastAddedCommandId(newCommand.__id);
                  setTimeout(() => {
                    lastAddedRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }, 50);

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

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          backgroundColor: "#4CAF50",
          color: "white",
          border: "none",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "20px",
          cursor: "pointer",
          boxShadow: "0 2px 6px rgba(0,0,0,0.3)"
        }}
        title="一番上へ"
      >
        ⬆
      </button>

    </div>

    
  );
}

export default App;
