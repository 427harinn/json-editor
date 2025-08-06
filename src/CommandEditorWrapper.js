// CommandEditorWrapper.js
import React, { useState, useEffect } from 'react';
import CommandEditor from './CommandEditor';

export default function CommandEditorWrapper({ command, onChange, onDelete, defaultCollapsed = true, forceExpand }) {
  // 初期状態のみ defaultCollapsed を使用
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  // defaultCollapsed の変更を監視（条件付き）
  useEffect(() => {
    if (!defaultCollapsed) {  // falseの場合（新規追加時）のみ更新
      setCollapsed(false);
    }
  }, [defaultCollapsed]);

  // forceExpand の処理
  useEffect(() => {
    if (forceExpand === true) {
      setCollapsed(false);
    } else if (forceExpand === false) {
      setCollapsed(true);
    }
  }, [forceExpand]);

  const toggleCollapse = () => setCollapsed(!collapsed);

  const getSummary = () => {
    if (command.type === 'show_text') {
      const text = command.text || '';
      return `: "${text.slice(0, 10)}${text.length > 10 ? '...' : ''}"`;
    }
    if (command.type === 'show_character') {
      return `: ${command.character} @ ${command.position}`;
    }
    return '';
  };

  return (
    <div
      style={{
        padding: '6px',
        borderRadius: '6px',
        marginBottom: '10px',
        backgroundColor: collapsed ? '#f8f8f8' : 'white'
      }}
    >
      <div
        style={{ cursor: 'pointer', fontWeight: 'bold' }}
        onClick={toggleCollapse}
      >
        {collapsed ? '▶' : '▼'} {command.type}{getSummary()} {collapsed ? '（クリックで展開）' : '（クリックで折りたたみ）'}
      </div>

      {!collapsed && (
        <>
          <CommandEditor command={command} onChange={onChange} />
        </>
      )}
    </div>
  );
}
