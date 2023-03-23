"use client";

import { FormEvent, useState } from "react";
import useSWR from "swr";
import fetchImages from "../lib/fetchImages";
import fetchSuggestionFromChatGPT from "../lib/fetchSuggestionFromChatGPT";
import toast from "react-hot-toast";

function PromptInput() {
  const [input, setInput] = useState("");

  const {
    data: suggestion,
    isLoading,
    mutate,
    isValidating,
  } = useSWR("suggestion", fetchSuggestionFromChatGPT, {
    revalidateOnFocus: false,
  });

  const { mutate: updateImages } = useSWR("images", fetchImages, {
    revalidateOnFocus: false,
  });

  const submitPrompt = async (useSuggestion?: boolean) => {
    const inputPrompt = input;
    console.log(inputPrompt);
    setInput("");

    const notificationPrompt = inputPrompt || suggestion;
    const notificationPromptShort = notificationPrompt.slice(0, 20);

    const notification = toast.loading(
      `DALL·E is creating: ${notificationPromptShort}...`
    );

    const p = useSuggestion
      ? suggestion
      : inputPrompt || (!isLoading && !isValidating && suggestion);

    const res = await fetch("/api/generateImage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: p,
      }),
    });

    const data = await res.json();

    if (data.error) {
      toast.error(data.error);
    } else {
      toast.success(`Your AI Art has been Generated!`, {
        id: notification,
      });
    }

    updateImages();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await submitPrompt();
  };

  const loading = isValidating || isLoading;

  return (
    <div className="m-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col lg:flex-row shadow-md shadow-slate-400/10 border rounded-md lg:divide-x"
      >
        <textarea
          placeholder={
            (loading && "ChatGPT is thinking of a suggestion...") ||
            suggestion ||
            "Enter a prompt..."
          }
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-4 outline-none rounded-md"
        />
        <button
          className={`p-4 ${
            input
              ? "bg-violet-500 text-white transition-colors duration-200"
              : "text-gray-300 cursor-not-allowed"
          } font-bold`}
          type="submit"
          disabled={!input}
        >
          Generate
        </button>
        <button
          className={`p-4 bg-violet-400 text-white transition-colors duration-200 font-bold disabled:text-gray-300 disabled:cursor-not-allowed disabled:bg-gray-400`}
          onClick={() => submitPrompt(true)}
          disabled={isLoading || isValidating}
          type="button"
        >
          Use Suggestion
        </button>
        <button
          className={`p-4 bg-white text-violet-500 border-none transition-colors duration-200 rounded-b-md md:rounded-r-md md:rounded-bl-none font-bold`}
          onClick={mutate}
          type="button"
        >
          New Suggestion
        </button>
      </form>

      {input && (
        <p className="italic pt-2 pl-2 font-light">
          Suggestion:{" "}
          <span className="text-violet-500">
            {loading ? "ChatGPT is thinking..." : suggestion}
          </span>
        </p>
      )}
    </div>
  );
}

export default PromptInput;
