import React, { useState } from 'react';
import CommandEditor from './CommandEditor';


function App() {
  const [jsonData, setJsonData] = useState(null);

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

  return (
    <div style={{ padding: "20px" }}>
      <h1>ノベルゲーム JSON エディタ</h1>

      <input type="file" accept=".json" onChange={handleFileUpload} />

      {jsonData && (
        <div style={{ marginTop: "20px" }}>
          <h2>読み込んだJSONデータ：</h2>

          {jsonData.items.map((item, itemIndex) => (
            <div key={itemIndex} style={{ marginBottom: "30px", padding: "10px", border: "1px solid #ccc" }}>
              <h3>ステップ {itemIndex + 1}</h3>

              {item.commands.map((command, commandIndex) => (
                <CommandEditor
                  key={commandIndex}
                  command={command}
                  onChange={(updatedCommand) => {
                    const newData = { ...jsonData };
                    newData.items[itemIndex].commands[commandIndex] = updatedCommand;
                    setJsonData(newData);
                  }}
                />
              ))}

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

export default App;
