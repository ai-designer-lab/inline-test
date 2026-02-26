"use client";

import React, { useRef, useState } from "react";
import type { FeedbackState } from "./types";
import { FONT, COLOR } from "./tokens";

// ─── Icons ────────────────────────────────────────────────────────────────────

function ThumbsUpSvg() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 10v12" />
      <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    </svg>
  );
}

// ─── Tag config ───────────────────────────────────────────────────────────────

const BASE_TAGS = [
  "Incorrect or incomplete",
  "Didn't answer my question",
  "Slowly or buggy",
  "Style or tone",
  "Other",
];

const VIDEO_TAG = "Video wasn't helpful";

function buildTags(hasVideo: boolean) {
  if (!hasVideo) return BASE_TAGS;
  return [BASE_TAGS[0], BASE_TAGS[1], VIDEO_TAG, ...BASE_TAGS.slice(2)];
}

// ─── Panel content ────────────────────────────────────────────────────────────

interface FeedbackPanelProps {
  mode?: "positive" | "negative";
  hasVideo?: boolean;
  initialTags?: string[];
  initialText?: string;
  onSubmit: (tags: string[], text: string) => void;
  onClose: () => void;
}

function PanelContent({
  mode = "negative",
  hasVideo = false,
  initialTags = [],
  initialText = "",
  onSubmit,
  onClose,
}: FeedbackPanelProps) {
  const tags = mode === "negative" ? buildTags(hasVideo) : [];
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [text, setText] = useState(initialText);

  function toggleTag(tag: string) {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
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
        {mode === "positive" ? "Help us answer more questions like this" : "Help us improve this response"}
      </p>

      {mode === "negative" && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
          {tags.map((tag) => {
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
      )}

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
          onClick={() => onSubmit(selectedTags, text)}
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

export function FeedbackPanel({ mode, hasVideo, initialTags, initialText, onSubmit, onClose }: FeedbackPanelProps) {
  return (
    <div
      style={{
        padding: "12px 14px",
        background: COLOR.white,
        border: `1px solid ${COLOR.borderPrimary}`,
        borderRadius: 8,
      }}
    >
      <PanelContent
        mode={mode}
        hasVideo={hasVideo}
        initialTags={initialTags}
        initialText={initialText}
        onSubmit={onSubmit}
        onClose={onClose}
      />
    </div>
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

const VIDEO_URL_RE = /youtube\.com|youtu\.be|vimeo\.com/i;

export function AnswerFeedback({
  feedback,
  text,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
}: AnswerFeedbackProps) {
  const hasVideo = text ? VIDEO_URL_RE.test(text) : false;

  // Increment key each time panel opens to force PanelContent remount with fresh state
  const panelKeyRef = useRef(0);
  const prevOpenRef = useRef(feedback.panelOpen);
  if (feedback.panelOpen && !prevOpenRef.current) {
    panelKeyRef.current++;
  }
  prevOpenRef.current = feedback.panelOpen;

  return (
    <div style={{ marginTop: 12 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <ThumbBtn
          type="up"
          active={feedback.vote === "up"}
          onClick={() => onVote("up")}
        />
        <ThumbBtn
          type="down"
          active={feedback.vote === "down"}
          onClick={() => onVote("down")}
        />
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
          key={panelKeyRef.current}
          mode={feedback.vote === "up" ? "positive" : "negative"}
          hasVideo={hasVideo}
          initialTags={feedback.tags}
          initialText={feedback.text}
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
  onClick,
}: {
  type: "up" | "down";
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
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
        cursor: "pointer",
        fontSize: 13,
        padding: 0,
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
