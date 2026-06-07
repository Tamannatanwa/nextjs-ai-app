"use client";
import { Prompt } from "next/font/google";
import { useState } from "react";
export default function CompletionPage() {
  const [prompt, setPrompt] = useState(""); //user input
  const [completion, setCompletion] = useState(""); //ai response
  const [loading, setIsLoading] = useState(false); //loading flag
  const [error,setError] = useState<String | null>(null);

  const complete = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setPrompt("");

    try {
      const res = await fetch("/api/completion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      if(!res.ok){
        throw new Error(data.error || "Something went wrong")
      }
      setCompletion(data.text);
    } catch (err) {
      setError(
        err instanceof Error ? err.message
        : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      {/* {display area for completion will got here} */}
      {
        error && <div className="text-red-500">{error}</div>
      }
      {loading ? (
        <div>Loading...</div>
      ) : completion ? (
        <div>{completion}</div>
      ) : null}
      <form
        onSubmit={complete}
        className="fixed bottom-0 w-full max-w-md mx-auto left-0 right-0 p-4 bg-zinc-50"
      >
        <div className="flex gap-2">
          <input
            value={prompt}
            className="flex-1 dark:bg-zinc-800 p-2 border border-zinc-300 dark:border-zinc-2"
            placeholder="How can I help you?"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transform"
            type="submit"
            disabled={loading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}



