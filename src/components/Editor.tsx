import { useRef, useEffect } from 'react';
import Editor from "@monaco-editor/react";
import { useAtom } from 'jotai';
import { codeAtom } from '../store';
import type { editor } from 'monaco-editor';

export default function CodeEditor() {
  const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);
  const [code, setCode] = useAtom(codeAtom);

  function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
    editorRef.current = editor;
  }

  function handleEditorChange(value: string | undefined) {
    setCode(value || '');
  }

  useEffect(() => {
    if (editorRef.current) {
      const editor = editorRef.current;
      editor.updateOptions({
        minimap: { enabled: false },
        fontSize: 14,
        lineHeight: 21,
        padding: { top: 20 },
        scrollBeyondLastLine: false
      });
    }
  }, []);

  return (
    <Editor
      height="100vh"
      defaultLanguage="typescript"
      defaultValue={code}
      theme="vs-dark"
      options={{
        fontFamily: 'MonoLisa, Menlo, Monaco, "Courier New", monospace',
        fontLigatures: true,
        wordWrap: 'on',
        lineNumbers: 'on',
        renderWhitespace: 'selection',
        smoothScrolling: true,
        cursorSmoothCaretAnimation: 'on',
        cursorBlinking: 'smooth',
      }}
      onMount={handleEditorDidMount}
      onChange={handleEditorChange}
    />
  );
}