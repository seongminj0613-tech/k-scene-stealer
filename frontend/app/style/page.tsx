"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function StylePage() {
  const styles = [
    { id: 1, title: "Ocean / Night View", emoji: "🌊" },
    { id: 2, title: "Food Tour", emoji: "🍜" },
    { id: 3, title: "Cafe Hopping", emoji: "☕" },
    { id: 4, title: "Healing / Relaxation", emoji: "🧘" },
  ];

  const [selectedStyles, setSelectedStyles] = useState<number[]>([]);
  const router = useRouter();

  const toggleStyle = (id: number) => {
    setSelectedStyles((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const handleNext = () => {
    if (selectedStyles.length === 0) return;

    const selectedStyleTitles = styles
      .filter((style) => selectedStyles.includes(style.id))
      .map((style) => style.title);

    localStorage.setItem("style", JSON.stringify(selectedStyleTitles));
    router.push("/result");
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mt-2 text-3xl font-bold text-white">
          Choose your Busan travel style
        </h1>

        <p className="mt-2 text-gray-300">
          Pick the styles that match your vibe.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {styles.map((style) => {
            const isSelected = selectedStyles.includes(style.id);

            return (
              <button
                key={style.id}
                type="button"
                onClick={() => toggleStyle(style.id)}
                className={`rounded-2xl border p-5 text-left transition ${
                  isSelected
                    ? "border-white bg-white text-black"
                    : "border-gray-700 bg-zinc-900 text-white hover:border-gray-400"
                }`}
              >
                <div className="text-3xl">{style.emoji}</div>
                <h2
                  className={`mt-3 text-xl font-semibold ${
                    isSelected ? "text-black" : "text-white"
                  }`}
                >
                  {style.title}
                </h2>
              </button>
            );
          })}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => router.push("/duration")}
            className="rounded-xl border border-gray-500 px-5 py-3 text-white"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={selectedStyles.length === 0}
            className={`rounded-xl px-5 py-3 font-medium transition ${
              selectedStyles.length === 0
                ? "cursor-not-allowed bg-gray-700 text-gray-400"
                : "bg-white text-black hover:scale-105"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}