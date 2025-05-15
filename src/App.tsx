import CodeEditor from './components/Editor';
import AIPanel from './components/AIPanel';
import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <div className="flex">
      <div className="flex-1">
        <CodeEditor />
      </div>
      <AIPanel />
      <Toaster position="top-right" />
    </div>
  );
}