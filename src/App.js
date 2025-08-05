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
  // 編集済みJSONをダウンロードする関数
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(jsonData, null, 2)], {
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
