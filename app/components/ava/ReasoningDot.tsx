"use client";

import React from "react";
import { FONT, COLOR } from "./tokens";

const REASONING_STEPS = [
  "Thinking",
  "Pulling together the answer",
  "Checking the details",
];

interface ReasoningDotProps {
  phase: "reasoning" | "streaming";
  stepIndex?: number;
}

export function ReasoningDot({ phase, stepIndex = 0 }: ReasoningDotProps) {
  const label = REASONING_STEPS[stepIndex % REASONING_STEPS.length];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        minHeight: 20,
        marginTop: phase === "streaming" ? 10 : 0,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: 7,
          height: 7,
          borderRadius: "50%",
          backgroundColor: COLOR.greyscale900,
          animation: "avaPulse 1000ms ease-in-out infinite",
          flexShrink: 0,
        }}
      />
      {phase === "reasoning" && (
        <span
          key={stepIndex}
          style={{
            fontFamily: FONT,
            fontSize: 13,
            fontWeight: 500,
            color: COLOR.textTertiary,
            lineHeight: 1.5,
            display: "inline-block",
            whiteSpace: "nowrap",
            animation: "avaTextReveal 0.5s ease-out 0.15s both",
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}
