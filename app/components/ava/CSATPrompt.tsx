"use client";

import React, { useState, useEffect } from "react";
import type { CSATState } from "./types";
import { FONT, COLOR, TYPE } from "./tokens";

interface CSATPromptProps {
  csat: CSATState;
  onRate: (rating: number) => void;
  onDismiss: () => void;
}

export function CSATPrompt({ csat, onRate, onDismiss }: CSATPromptProps) {
  const [fadingOut, setFadingOut] = useState(false);

  // After submitting, wait 3s then start fade-out
  useEffect(() => {
    if (!csat.submitted) return;
    const t1 = setTimeout(() => setFadingOut(true), 3000);
    return () => clearTimeout(t1);
  }, [csat.submitted]);

  // After fade-out animation completes, dismiss
  useEffect(() => {
    if (!fadingOut) return;
    const t2 = setTimeout(() => onDismiss(), 400);
    return () => clearTimeout(t2);
  }, [fadingOut, onDismiss]);

  if (!csat.shown) return null;

  return (
    <div
      style={{
        padding: "12px 14px",
        background: COLOR.white,
        border: `1px solid ${COLOR.borderPrimary}`,
        borderRadius: 8,
        opacity: fadingOut ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}
    >
      {csat.submitted ? (
        <p style={{ ...TYPE.body, margin: 0, textAlign: "center", color: COLOR.textSecondary }}>
          Thanks for the feedback!
        </p>
      ) : (
        <>
          <p
            style={{
              fontFamily: FONT,
              fontSize: 16,
              fontWeight: 600,
              color: COLOR.textPrimary,
              margin: "0 0 10px 0",
              textAlign: "center",
            }}
          >
            How&apos;s this conversation so far?
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => onRate(n)}
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 8,
                  border: `1px solid ${csat.rating === n ? COLOR.greyscale900 : COLOR.borderPrimary}`,
                  background: csat.rating === n ? COLOR.greyscale900 : COLOR.white,
                  color: csat.rating === n ? COLOR.white : COLOR.textPrimary,
                  fontFamily: FONT,
                  fontWeight: 600,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 6,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: 5 * 34 + 4 * 8, // 5 buttons × 34px + 4 gaps × 8px
                fontFamily: FONT,
                fontSize: 12,
                color: COLOR.textTertiary,
              }}
            >
              <span>needs work</span>
              <span>really helpful</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
