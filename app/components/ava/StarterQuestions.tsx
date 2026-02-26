"use client";

import React from "react";
import type { StarterQuestion } from "../../mocks/sijoCoolingSleep";
import { FONT, COLOR, TYPE } from "./tokens";

interface StarterQuestionsProps {
  starters: StarterQuestion[];
  onSelect: (starter: StarterQuestion) => void;
  canNavLeft?: boolean;
  canNavRight?: boolean;
  onNavLeft?: () => void;
  onNavRight?: () => void;
}

export function StarterQuestions({ starters, onSelect, canNavLeft = false, canNavRight = false, onNavLeft, onNavRight }: StarterQuestionsProps) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            ...TYPE.h1,
            margin: 0,
            color: COLOR.textPrimary,
          }}
        >
          Question about this product?
        </p>
        <div style={{ display: "flex", gap: 0 }}>
          <ChevronBtn dir="left" disabled={!canNavLeft} onClick={onNavLeft} />
          <ChevronBtn dir="right" disabled={!canNavRight} onClick={onNavRight} />
        </div>
      </div>

      {/* Starter chips — black style */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
        {starters.map((s) => (
          <StarterChip key={s.id} label={s.label} onClick={() => onSelect(s)} />
        ))}
      </div>
    </div>
  );
}

function StarterChip({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 32,
        padding: "0 12px",
        borderRadius: 12,
        background: COLOR.black,
        border: "none",
        color: COLOR.white,
        fontFamily: FONT,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        letterSpacing: "-0.07px",
        cursor: "pointer",
        textAlign: "left",
        whiteSpace: "nowrap",
        maxWidth: "100%",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      {label}
    </button>
  );
}

function ChevronBtn({ dir, disabled = true, onClick }: { dir: "left" | "right"; disabled?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        padding: 0,
        cursor: disabled ? "default" : "pointer",
        color: disabled ? "#d0d0d0" : COLOR.textSecondary,
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {dir === "left"
          ? <polyline points="15 18 9 12 15 6" />
          : <polyline points="9 18 15 12 9 6" />
        }
      </svg>
    </button>
  );
}
