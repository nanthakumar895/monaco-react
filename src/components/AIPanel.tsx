import { useState } from 'react';
import { useAtom } from 'jotai';
import { codeAtom } from '../store';
import toast from 'react-hot-toast';

export default function AIPanel() {
  const [prompt, setPrompt] = useState('');
  const [code] = useAtom(codeAtom);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, code })
      });

      if (!response.ok) throw new Error('AI request failed');
      
      const data = await response.json();
      toast.success('AI response received');
      setPrompt('');
    } catch (error) {
      toast.error('Failed to get AI response');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed bottom-0 right-0 w-96 bg-zinc-900 border-l border-zinc-800 h-screen p-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask AI to help with your code..."
          className="w-full h-32 bg-zinc-800 border border-zinc-700 rounded-lg p-3 text-sm text-white resize-none"
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isLoading ? 'Processing...' : 'Send'}
        </button>
      </form>
    </div>
  );
}