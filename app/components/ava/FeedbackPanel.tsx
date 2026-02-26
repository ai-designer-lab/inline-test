"use client";

import React, { useState } from "react";
import type { FeedbackState } from "./types";
import { FONT, COLOR, TYPE } from "./tokens";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ThumbsUpSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

function CopySvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}

function CheckSvg() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const FEEDBACK_TAGS = [
  "Not accurate",
  "Missing info",
  "Too vague",
  "Not helpful",
  "Wrong product",
];

interface FeedbackPanelProps {
  onSubmit: (tags: string[], text: string) => void;
  onClose: () => void;
}

function PanelContent({
  onSubmit,
  onClose,
}: FeedbackPanelProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }

  if (submitted) {
    return (
      <p style={{ ...TYPE.body, margin: 0, color: COLOR.textSecondary }}>
        Thanks — saved
      </p>
    );
  }

  return (
    <div>
      <p
        style={{
          fontFamily: FONT,
          fontSize: 16,
          fontWeight: 600,
          color: COLOR.textPrimary,
          margin: "0 0 8px 0",
        }}
      >
        What went wrong?
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
        {FEEDBACK_TAGS.map((tag) => {
          const active = selectedTags.includes(tag);
          return (
            <button
              key={tag}
              onClick={() => toggleTag(tag)}
              style={{
                padding: "3px 10px",
                fontSize: 14,
                fontFamily: FONT,
                fontWeight: 500,
                borderRadius: 20,
                border: `1px solid ${active ? COLOR.greyscale900 : COLOR.borderPrimary}`,
                background: active ? COLOR.greyscale900 : COLOR.white,
                color: active ? COLOR.white : COLOR.textPrimary,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Tell us more…"
        rows={2}
        style={{
          width: "100%",
          padding: "6px 8px",
          fontFamily: FONT,
          fontSize: 14,
          border: `1px solid ${COLOR.borderPrimary}`,
          borderRadius: 6,
          resize: "none",
          color: COLOR.textPrimary,
          outline: "none",
          boxSizing: "border-box",
          marginBottom: 8,
        }}
      />
      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => {
            setSubmitted(true);
            onSubmit(selectedTags, text);
          }}
          style={{
            padding: "5px 14px",
            fontFamily: FONT,
            fontSize: 14,
            fontWeight: 600,
            borderRadius: 6,
            border: "none",
            background: COLOR.greyscale900,
            color: COLOR.white,
            cursor: "pointer",
          }}
        >
          Submit
        </button>
        <button
          onClick={onClose}
          style={{
            padding: "5px 14px",
            fontFamily: FONT,
            fontSize: 14,
            borderRadius: 6,
            border: `1px solid ${COLOR.borderPrimary}`,
            background: COLOR.white,
            color: COLOR.textSecondary,
            cursor: "pointer",
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export function FeedbackPanel({ onSubmit, onClose }: FeedbackPanelProps) {
  return (
    <div
      style={{
        padding: "12px 14px",
        background: COLOR.white,
        border: `1px solid ${COLOR.borderPrimary}`,
        borderRadius: 8,
      }}
    >
      <PanelContent onSubmit={onSubmit} onClose={onClose} />
    </div>
  );
}

// ─── Copy button ──────────────────────────────────────────────────────────────

function CopyBtn({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }

  return (
    <button
      onClick={handleCopy}
      title="Copy answer"
      style={{
        width: 26,
        height: 26,
        borderRadius: 6,
        border: copied ? `1px solid ${COLOR.greyscale900}` : "none",
        background: COLOR.white,
        color: copied ? COLOR.greyscale900 : COLOR.textTertiary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        padding: 0,
        transition: "all 0.15s",
      }}
    >
      {copied ? <CheckSvg /> : <CopySvg />}
    </button>
  );
}

// ─── Answer feedback (thumbs) ─────────────────────────────────────────────────

interface AnswerFeedbackProps {
  feedback: FeedbackState;
  text?: string;
  onVote: (vote: "up" | "down") => void;
  onFeedbackSubmit: (tags: string[], text: string) => void;
  onFeedbackClose: () => void;
}

export function AnswerFeedback({
  feedback,
  text,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
}: AnswerFeedbackProps) {
  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ThumbBtn
          type="up"
          active={feedback.vote === "up"}
          disabled={feedback.submitted}
          onClick={() => onVote("up")}
        />
        <ThumbBtn
          type="down"
          active={feedback.vote === "down"}
          disabled={feedback.submitted}
          onClick={() => onVote("down")}
        />
        {text && <CopyBtn text={text} />}
        {feedback.vote === "up" && !feedback.submitted && (
          <span style={{ fontFamily: FONT, fontSize: 12, color: COLOR.textTertiary, marginLeft: 4 }}>
            Glad it helped
          </span>
        )}
      </div>

      <div
        style={{
          maxHeight: feedback.panelOpen ? 400 : 0,
          opacity: feedback.panelOpen ? 1 : 0,
          marginTop: feedback.panelOpen ? 10 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease, opacity 0.2s ease, margin-top 0.3s ease",
        }}
      >
        <FeedbackPanel
          onSubmit={onFeedbackSubmit}
          onClose={onFeedbackClose}
        />
      </div>
    </div>
  );
}

function ThumbBtn({
  type,
  active,
  disabled,
  onClick,
}: {
  type: "up" | "down";
  active: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={type === "up" ? "Helpful" : "Not helpful"}
      style={{
        width: 26,
        height: 26,
        borderRadius: 6,
        border: active ? `1px solid ${COLOR.greyscale900}` : "none",
        background: active ? COLOR.greyscale900 : COLOR.white,
        color: active ? COLOR.white : COLOR.textTertiary,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: disabled ? "default" : "pointer",
        fontSize: 13,
        padding: 0,
        opacity: disabled && !active ? 0.35 : 1,
        transition: "all 0.15s",
        fontFamily: FONT,
      }}
    >
      <span style={type === "down" ? { display: "flex", transform: "rotate(180deg)" } : {}}>
        <ThumbsUpSvg />
      </span>
    </button>
  );
}
