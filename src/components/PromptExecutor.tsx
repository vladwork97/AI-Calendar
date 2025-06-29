import { useState } from "react";

interface PromptExecutorProps {
  onDone?: () => void;
}

const PromptExecutor = ({ onDone }: PromptExecutorProps) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(
        "https://aicalendarbackend.onrender.com/api/v1/events/prompt",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt }),
        }
      );

      if (!res.ok) throw new Error("Server error");
      const data = await res.text();
      setResponse(data);

      if (onDone) onDone();
    } catch (err) {
      setResponse("Failed to process prompt.");
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="bg-indigo-100 p-4 rounded shadow mb-4">
      <label className="block mb-2 font-medium text-gray-700">
        Enter scheduling instruction:
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="e.g. Cancel all events with title 'Coffee break'"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
      <label className="block mb-2 font-medium text-gray-700">
          Allowed commands:
          <ul>
            <li>- cancel all events</li>
            <li>- add meeting with 'user@gmail.com' on 30.06.2025 from 14:00 to 15:30 with title 'Coffee break'</li>
          </ul>
     </label>
      {response && <p className="mt-3 text-green-700">{response}</p>}
    </div>
  );
};

export default PromptExecutor;
