"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Preferences = {
  companion: string;
  dietary: string[];
  accessibility: string[];
};

type ResultData = {
  language: string;
  preferences: Preferences | null;
  duration: string;
  style: string[] | string;
};

export default function ResultsPage() {
  const router = useRouter();

  const [resultData, setResultData] = useState<ResultData>({
    language: "",
    preferences: null,
    duration: "",
    style: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "";
    const savedDuration = localStorage.getItem("duration") || "";
    const savedStyle = localStorage.getItem("style");
    const savedPreferences = localStorage.getItem("preferences");

    let parsedStyle: string[] | string = [];
    let parsedPreferences: Preferences | null = null;

    try {
      if (savedStyle) {
        parsedStyle = JSON.parse(savedStyle);
      }
    } catch {
      parsedStyle = savedStyle || [];
    }

    try {
      if (savedPreferences) {
        parsedPreferences = JSON.parse(savedPreferences);
      }
    } catch {
      parsedPreferences = null;
    }

    setResultData({
      language: savedLanguage,
      preferences: parsedPreferences,
      duration: savedDuration,
      style: parsedStyle,
    });

    setLoading(false);
  }, []);

  const styleText = Array.isArray(resultData.style)
    ? resultData.style.length > 0
      ? resultData.style.join(", ")
      : "Not selected"
    : resultData.style || "Not selected";

  const dietaryText =
    resultData.preferences?.dietary?.length
      ? resultData.preferences.dietary.join(", ")
      : "Not selected";

  const accessibilityText =
    resultData.preferences?.accessibility?.length
      ? resultData.preferences.accessibility.join(", ")
      : "None";

  const companionText =
    resultData.preferences?.companion || "Not selected";

  const isDataMissing =
    !resultData.language ||
    !resultData.duration ||
    !resultData.preferences ||
    !resultData.preferences.companion ||
    !resultData.preferences.dietary?.length ||
    !styleText ||
    styleText === "Not selected";

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-6 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-3xl font-bold">Loading your trip summary...</h1>
          <p className="mt-3 text-gray-400">
            We’re gathering your selections.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-5xl">
        <p className="text-sm uppercase tracking-[0.2em] text-cyan-400">
          Result Summary
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Your Busan trip, personalized
        </h1>

        <p className="mt-3 max-w-2xl text-gray-300">
          Here’s a summary of your selections. This page can later connect
          directly to your database, recommendation API, and AI analysis flow.
        </p>

        {isDataMissing && (
          <div className="mt-6 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Some selections are missing. Complete all steps for the full result.
          </div>
        )}

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
            <p className="text-sm text-cyan-400">1. Language</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {resultData.language || "Not selected"}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Selected language for the final travel experience.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
            <p className="text-sm text-cyan-400">2. Travel Preferences</p>
            <div className="mt-4 space-y-3 text-sm text-gray-200">
              <div>
                <span className="text-gray-400">Companion:</span>{" "}
                {companionText}
              </div>
              <div>
                <span className="text-gray-400">Dietary:</span>{" "}
                {dietaryText}
              </div>
              <div>
                <span className="text-gray-400">Accessibility:</span>{" "}
                {accessibilityText}
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
            <p className="text-sm text-cyan-400">3. Duration</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {resultData.duration || "Not selected"}
            </h2>
            <p className="mt-3 text-sm text-gray-400">
              Length of stay used for planning your Busan route.
            </p>
          </section>

          <section className="rounded-2xl border border-white/10 bg-zinc-900/80 p-6">
            <p className="text-sm text-cyan-400">4. Travel Style</p>
            <h2 className="mt-2 text-2xl font-semibold">{styleText}</h2>
            <p className="mt-3 text-sm text-gray-400">
              Your selected vibe for the recommendation flow.
            </p>
          </section>
        </div>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-cyan-400">Ready for API / AI Connection</p>
          <h2 className="mt-2 text-2xl font-semibold">
            Structured input preview
          </h2>

          <div className="mt-4 overflow-x-auto rounded-xl bg-black/40 p-4 text-sm text-gray-200">
            <pre className="whitespace-pre-wrap break-words">
{JSON.stringify(
  {
    language: resultData.language,
    companion: resultData.preferences?.companion || "",
    dietary: resultData.preferences?.dietary || [],
    accessibility: resultData.preferences?.accessibility || [],
    duration: resultData.duration,
    style: resultData.style,
  },
  null,
  2
)}
            </pre>
          </div>

          <p className="mt-4 text-sm text-gray-400">
            This object can be sent later to your backend API, database, or AI
            recommendation engine.
          </p>
        </section>

        <div className="mt-10 flex items-center justify-between">
          <button
            type="button"
            onClick={() => router.push("/style")}
            className="rounded-xl border border-gray-500 px-5 py-3 transition hover:border-gray-300"
          >
            Back
          </button>

          <button
            type="button"
            className="rounded-xl bg-white px-5 py-3 text-black transition hover:bg-gray-200"
          >
            Generate Recommendation
          </button>
        </div>
      </div>
    </main>
  );
}