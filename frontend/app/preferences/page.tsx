"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function PreferencesPage() {
  const router = useRouter();
  const [selectedCompanion, setSelectedCompanion] = useState<string>("");
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<string[]>([]);

  const companions = ["Solo", "Couple", "Friends", "Family"];
  const dietaryOptions = ["None", "Seafood allergy", "Vegetarian", "Halal"];
  const accessibilityOptions = ["None", "Wheelchair", "Stroller", "Visually impaired"];

  const toggleDietary = (option: string) => {
    setSelectedDietary((prev) => {
      if (option === "None") {
        return prev.includes("None") ? [] : ["None"];
      }

      const withoutNone = prev.filter((item) => item !== "None");

      if (withoutNone.includes(option)) {
        return withoutNone.filter((item) => item !== option);
      }

      return [...withoutNone, option];
    });
  };

  const toggleAccessibility = (option: string) => {
    setSelectedAccessibility((prev) => {
      if (option === "None") {
        return prev.includes("None") ? [] : ["None"];
      }

      const withoutNone = prev.filter((item) => item !== "None");

      if (withoutNone.includes(option)) {
        return withoutNone.filter((item) => item !== option);
      }

      return [...withoutNone, option];
    });
  };

  const isNextEnabled =
    selectedCompanion !== "" && selectedDietary.length > 0;

  const handleNext = () => {
    if (!isNextEnabled) return;

    const preferences = {
      companion: selectedCompanion,
      dietary: selectedDietary,
      accessibility: selectedAccessibility,
    };

    localStorage.setItem("preferences", JSON.stringify(preferences));
    router.push("/duration");
  };

  return (
    <main className="min-h-screen bg-black px-6 py-10 text-white">
      <div className="mx-auto max-w-3xl">
        <h1 className="mt-2 text-3xl font-bold">Tell us about your trip</h1>

        <p className="mt-2 text-gray-300">
          This helps us recommend better places.
        </p>

        <div className="mt-8">
          <h2 className="text-lg font-semibold">
            Who are you traveling with?
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {companions.map((companion) => {
              const isSelected = selectedCompanion === companion;

              return (
                <button
                  key={companion}
                  type="button"
                  onClick={() => setSelectedCompanion(companion)}
                  className={`rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-gray-700 bg-zinc-900 text-white hover:border-gray-400"
                  }`}
                >
                  {companion}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">
            Any dietary preferences?
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Please select at least one option.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {dietaryOptions.map((option) => {
              const isSelected = selectedDietary.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleDietary(option)}
                  className={`rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-gray-700 bg-zinc-900 text-white hover:border-gray-400"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-lg font-semibold">
            Accessibility needs (optional)
          </h2>

          <p className="mt-2 text-sm text-gray-400">
            Let us know if you need accessible-friendly places.
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {accessibilityOptions.map((option) => {
              const isSelected = selectedAccessibility.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => toggleAccessibility(option)}
                  className={`rounded-xl border p-4 text-left transition ${
                    isSelected
                      ? "border-white bg-white text-black"
                      : "border-gray-700 bg-zinc-900 text-white hover:border-gray-400"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 flex justify-between">
          <button
            onClick={() => router.push("/language")}
            className="rounded-xl border border-gray-500 px-5 py-3"
          >
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!isNextEnabled}
            className={`rounded-xl px-5 py-3 transition ${
              isNextEnabled
                ? "bg-white text-black"
                : "cursor-not-allowed bg-zinc-700 text-zinc-400"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}