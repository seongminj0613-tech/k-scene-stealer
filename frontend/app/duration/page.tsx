"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DurationPage() {
  const router = useRouter();
  const [selectedDuration, setSelectedDuration] = useState<string>("");

  const durations = [
    "Half day",
    "One day trip",
    "1 night, 2 days",
    "2 nights, 3 days or more",
  ];

  const handleBack = () => {
    router.push("/preferences"); 
  };

  const handleNext = () => {
    if (!selectedDuration) return;

    localStorage.setItem("duration", selectedDuration);
    router.push("/style"); // 또는 /preferences
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
        <div className="w-full rounded-[28px] border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm">
          <h1 className="text-4xl font-bold tracking-tight">
            How long will you stay in Busan?
          </h1>
          <p className="mt-3 text-sm text-gray-400">
            Select your travel duration and we’ll recommend a course that fits
            your schedule.
          </p>

          <div className="mt-8 space-y-4">
            {durations.map((duration) => {
              const isSelected = selectedDuration === duration;

              return (
                <button
                  key={duration}
                  type="button"
                  onClick={() => setSelectedDuration(duration)}
                  className={`w-full rounded-2xl border px-5 py-5 text-left text-2xl font-semibold transition ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-white/10 bg-white/5 text-white hover:border-white/30 hover:bg-white/10"
                  }`}
                >
                  {duration}
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between">
            <button
              type="button"
              onClick={handleBack}
              className="rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Back
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!selectedDuration}
              className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
                selectedDuration
                  ? "bg-white text-black hover:bg-gray-200"
                  : "cursor-not-allowed bg-white/10 text-gray-500"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}