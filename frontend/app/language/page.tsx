"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LanguagePage() {
  const router = useRouter();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");

  return (
    <main
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#020617",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.45)",
          pointerEvents: "none",
        }}
      />

      <section
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "760px",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "24px",
          padding: "36px",
          backgroundColor: "rgba(255,255,255,0.04)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
        }}
      >
        <p
          style={{
            textAlign: "center",
            fontSize: "13px",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#7dd3fc",
            marginBottom: "12px",
          }}
        >
          Language Selection
        </p>

        <h1
          style={{
            textAlign: "center",
            fontSize: "42px",
            fontWeight: "bold",
            marginBottom: "14px",
          }}
        >
          Choose Your Language
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "rgba(255,255,255,0.7)",
            marginBottom: "32px",
          }}
        >
          Please select your preferred language to continue planning your Busan trip.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "16px",
          }}
        >
          {["English", "中文", "Français", "한국어"].map((language) => {
            const isSelected = selectedLanguage === language;

            return (
              <button
                key={language}
                onClick={() => setSelectedLanguage(language)}
                style={{
                  padding: "20px",
                  borderRadius: "18px",
                  border: isSelected
                    ? "1px solid white"
                    : "1px solid rgba(255,255,255,0.1)",
                  backgroundColor: isSelected
                    ? "white"
                    : "rgba(255,255,255,0.05)",
                  color: isSelected ? "black" : "white",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {language}
              </button>
            );
          })}
        </div>

        <div
          style={{
            marginTop: "32px",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <button
            onClick={() => router.push("/")}
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.3)",
              background: "transparent",
              color: "white",
              cursor: "pointer",
            }}
          >
            Back
          </button>

          <button
            onClick={() => {
              if (selectedLanguage) {
                localStorage.setItem("language", selectedLanguage);
                router.push("/preferences");
              }
            }}
            disabled={!selectedLanguage}
            style={{
              padding: "12px 20px",
              borderRadius: "999px",
              border: "none",
              background: selectedLanguage ? "white" : "gray",
              color: "black",
              cursor: selectedLanguage ? "pointer" : "not-allowed",
              opacity: selectedLanguage ? 1 : 0.5,
            }}
          >
            Next
          </button>
        </div>
      </section>
    </main>
  );
}