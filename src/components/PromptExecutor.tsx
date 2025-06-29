import { useState } from "react";

interface PromptExecutorProps {
  onDone?: () => void;
}

const PromptExecutor = ({ onDone }: PromptExecutorProps) => {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleSubmit = async () => {
    if (!prompt.trim()) return;

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
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          Send
        </button>
      </div>
      <label className="block mb-2 font-medium text-gray-700">
          Allowed commands:
          - cancel all events with title 'EVENT TITLE HERE'
          - add meeting with Nick on Friday from 14:00 to 15:30
     </label>
      {response && <p className="mt-3 text-green-700">{response}</p>}
    </div>
  );
};

export default PromptExecutor;
