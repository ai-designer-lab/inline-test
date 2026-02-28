"use client";

import React, { useState, useRef, useCallback, useMemo } from "react";
import { StarterQuestions } from "./StarterQuestions";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { ReasoningDot } from "./ReasoningDot";
import { AnswerFeedback } from "./FeedbackPanel";
import { SIJO_STARTERS, SIJO_ANSWERS } from "../../mocks/sijoCoolingSleep";
import type { StarterQuestion } from "../../mocks/sijoCoolingSleep";
import type { Message, FeedbackState } from "./types";
import {
  REASONING_STEP_MS,
  ANSWER_START_DELAY_MS,
  STREAM_CHUNK_MS,
  MIN_REASONING_MS,
} from "./constants";
import { FONT, COLOR, TYPE } from "./tokens";

// ─── Constants ───────────────────────────────────────────────────────────────

const REASONING_STEPS = [
  "Thinking",
  "Pulling together the answer",
  "Checking the details",
];
const CHUNK_SIZE = 3;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function makeFeedback(): FeedbackState {
  return { vote: null, panelOpen: false, tags: [], text: "", submitted: false };
}

interface QAPair {
  id: string;
  question: string;
  avaMsg: Message;
}

// ─── Icons ───────────────────────────────────────────────────────────────────

function ChevronLeftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" aria-hidden>
      <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z" />
    </svg>
  );
}

// ─── Follow-up chip ───────────────────────────────────────────────────────────

function FollowUpChip({
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
        whiteSpace: "nowrap",
      }}
    >
      {label}
    </button>
  );
}

// ─── Nav button ──────────────────────────────────────────────────────────────

function NavButton({
  direction,
  disabled,
  onClick,
}: {
  direction: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        width: 24,
        height: 24,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "none",
        border: "none",
        color: disabled ? "#d0d0d0" : COLOR.textSecondary,
        cursor: disabled ? "default" : "pointer",
        padding: 0,
        borderRadius: 4,
        flexShrink: 0,
      }}
    >
      {direction === "left" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
    </button>
  );
}

// ─── Answer content area ─────────────────────────────────────────────────────

interface AnswerContentProps {
  msg: Message;
  reasoningStep: number;
  onVote: (vote: "up" | "down") => void;
  onFeedbackSubmit: (tags: string[], text: string) => void;
  onFeedbackClose: () => void;
}

function AnswerContent({
  msg,
  reasoningStep,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
}: AnswerContentProps) {
  const isLoading = msg.status === "loading";
  const isReasoning = msg.status === "reasoning";
  const isStreaming = msg.status === "streaming";
  const isComplete = msg.status === "complete";

  return (
    <div>
      {/* Loading dots */}
      {isLoading && (
        <div style={{ display: "flex", gap: 4, alignItems: "center", height: 24 }}>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "#ccc",
                display: "inline-block",
                animation: `avaPulse 1000ms ease-in-out ${i * 200}ms infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Reasoning phase */}
      {isReasoning && <ReasoningDot phase="reasoning" stepIndex={reasoningStep} />}

      {/* Streaming + complete */}
      {(isStreaming || isComplete) && (
        <div>
          <MarkdownAnswer markdown={msg.text} />
          {isStreaming && <ReasoningDot phase="streaming" />}
        </div>
      )}

      {/* Feedback + follow-ups (complete only) */}
      {isComplete && (
        <>
          {msg.feedback && (
            <AnswerFeedback
              feedback={msg.feedback}
              text={msg.text}
              onVote={onVote}
              onFeedbackSubmit={onFeedbackSubmit}
              onFeedbackClose={onFeedbackClose}
            />
          )}

        </>
      )}
    </div>
  );
}

// ─── Powered by Firework ──────────────────────────────────────────────────────

function PoweredByFirework() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ ...TYPE.caption }}>Powered by</span>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 10,
          fontWeight: 600,
          color: COLOR.textSecondary,
          letterSpacing: "0.02em",
        }}
      >
        Firework
      </span>
    </div>
  );
}

// ─── Main widget ─────────────────────────────────────────────────────────────

export function AvaInlineWidget() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentPairIdx, setCurrentPairIdx] = useState(0);
  const [viewMode, setViewMode] = useState<"starter" | "qa">("starter");
  const [reasoningStep, setReasoningStep] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const streamingRef = useRef(false);

  // Derive Q&A pairs from flat messages array
  const pairs = useMemo<QAPair[]>(() => {
    const result: QAPair[] = [];
    for (let i = 0; i + 1 < messages.length; i += 2) {
      result.push({
        id: messages[i + 1].id,
        question: messages[i].text,
        avaMsg: messages[i + 1],
      });
    }
    return result;
  }, [messages]);

  const currentPair = pairs[currentPairIdx] ?? null;

  const isStreaming = messages.some(
    (m) =>
      m.status === "loading" ||
      m.status === "reasoning" ||
      m.status === "streaming"
  );

  // Show input bar only once a conversation has started
  const showInputBar = pairs.length > 0;

  const triggerAnswer = useCallback(
    (userText: string, nextAnswerId: string) => {
      if (streamingRef.current) return;
      streamingRef.current = true;

      const userId = `msg-user-${Date.now()}`;
      const avaId = `msg-ava-${Date.now() + 1}`;
      const nextIdx = Math.floor(messages.length / 2);

      setMessages((prev) => [
        ...prev,
        { id: userId, role: "user", text: userText, status: "complete" },
        {
          id: avaId,
          role: "ava",
          text: "",
          status: "loading",
          feedback: makeFeedback(),
        },
      ]);
      setCurrentPairIdx(nextIdx);
      setViewMode("qa");

      const answer = SIJO_ANSWERS[nextAnswerId];
      const fullMarkdown =
        answer?.markdown ??
        "This is a scripted demo — try one of the suggested questions above.";

      let stepIdx = 0;
      const reasoningStart = Date.now();

      const stepTimer = setInterval(() => {
        stepIdx++;
        if (stepIdx < REASONING_STEPS.length) {
          setReasoningStep(stepIdx);
          setMessages((prev) =>
            prev.map((m) =>
              m.id === avaId ? { ...m, status: "reasoning" } : m
            )
          );
        } else {
          clearInterval(stepTimer);
          const elapsed = Date.now() - reasoningStart;
          const remaining = Math.max(0, MIN_REASONING_MS - elapsed);

          setTimeout(() => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === avaId ? { ...m, status: "streaming" } : m
              )
            );

            let charIdx = 0;
            const streamTimer = setInterval(() => {
              charIdx = Math.min(charIdx + CHUNK_SIZE, fullMarkdown.length);
              const partial = fullMarkdown.slice(0, charIdx);
              setMessages((prev) =>
                prev.map((m) =>
                  m.id === avaId ? { ...m, text: partial } : m
                )
              );

              if (charIdx >= fullMarkdown.length) {
                clearInterval(streamTimer);
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === avaId
                      ? {
                          ...m,
                          status: "complete",
                          text: fullMarkdown,
                          followUps: answer?.followUps ?? [],
                        }
                      : m
                  )
                );
                streamingRef.current = false;
              }
            }, STREAM_CHUNK_MS);
          }, remaining + ANSWER_START_DELAY_MS);
        }
      }, REASONING_STEP_MS);

      setReasoningStep(0);
      setMessages((prev) =>
        prev.map((m) =>
          m.id === avaId ? { ...m, status: "reasoning" } : m
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [messages.length]
  );

  function handleStarter(starter: StarterQuestion) {
    triggerAnswer(starter.userMessage, starter.nextAnswerId);
  }

  function handleFollowUp(userMessage: string, nextAnswerId: string) {
    triggerAnswer(userMessage, nextAnswerId);
  }

  function handleVote(messageId: string, vote: "up" | "down") {
    setMessages((prev) =>
      prev.map((m) => {
        if (m.id !== messageId || !m.feedback) return m;
        if (m.feedback.submitted) return m; // locked — no changes after submit
        const isSameVote = m.feedback.vote === vote;
        if (isSameVote) {
          // Undo
          return { ...m, feedback: { ...m.feedback, vote: null, panelOpen: false } };
        }
        // Thumbs up: no panel. Thumbs down: open panel.
        const switching = m.feedback.vote !== null;
        return {
          ...m,
          feedback: {
            ...m.feedback,
            vote,
            panelOpen: vote === "down",
            ...(switching ? { tags: [], text: "" } : {}),
          },
        };
      })
    );
  }

  function handleFeedbackSubmit(
    messageId: string,
    tags: string[],
    text: string
  ) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.feedback
          ? {
              ...m,
              feedback: {
                ...m.feedback,
                tags,
                text,
                submitted: true,
                panelOpen: false,
              },
            }
          : m
      )
    );
  }

  function handleFeedbackClose(messageId: string) {
    setMessages((prev) =>
      prev.map((m) =>
        m.id === messageId && m.feedback
          ? { ...m, feedback: { ...m.feedback, panelOpen: false } }
          : m
      )
    );
  }

  function handleNavLeft() {
    if (viewMode === "qa") {
      if (currentPairIdx === 0) {
        setViewMode("starter");
      } else {
        setCurrentPairIdx((i) => i - 1);
      }
    }
  }

  function handleNavRight() {
    if (viewMode === "starter" && pairs.length > 0) {
      setCurrentPairIdx(0);
      setViewMode("qa");
    } else if (viewMode === "qa" && currentPairIdx < pairs.length - 1) {
      setCurrentPairIdx((i) => i + 1);
    }
  }

  const canNavLeft = viewMode === "qa";
  const canNavRight = viewMode === "starter" ? pairs.length > 0 : currentPairIdx < pairs.length - 1;

  function handleSend() {
    if (!inputValue.trim()) return;
    setInputValue("");
    // Scripted prototype — free-form not wired to answers
  }

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        background: COLOR.white,
        fontFamily: FONT,
        overflow: "hidden",
      }}
    >
      {/* ── Scrollable content ──────────────────────────────────────────── */}
      <div
        style={{
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {viewMode === "starter" ? (
          /* ── Starter state ── */
          <StarterQuestions
            starters={SIJO_STARTERS}
            onSelect={handleStarter}
            canNavLeft={canNavLeft}
            canNavRight={canNavRight}
            onNavLeft={handleNavLeft}
            onNavRight={handleNavRight}
          />
        ) : currentPair ? (
          /* ── Active Q&A card ── */
          <>
            {/* Header: question + nav */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 8,
              }}
            >
              <div
                style={{
                  ...TYPE.h1,
                  flex: 1,
                  margin: 0,
                }}
              >
                {currentPair.question}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexShrink: 0,
                  marginTop: 2,
                }}
              >
                <NavButton
                  direction="left"
                  disabled={!canNavLeft}
                  onClick={handleNavLeft}
                />
                <NavButton
                  direction="right"
                  disabled={!canNavRight}
                  onClick={handleNavRight}
                />
              </div>
            </div>

            {/* Answer */}
            <AnswerContent
              msg={currentPair.avaMsg}
              reasoningStep={reasoningStep}
              onVote={(vote) => handleVote(currentPair.avaMsg.id, vote)}
              onFeedbackSubmit={(tags, text) =>
                handleFeedbackSubmit(currentPair.avaMsg.id, tags, text)
              }
              onFeedbackClose={() =>
                handleFeedbackClose(currentPair.avaMsg.id)
              }
            />

            {/* Follow-up chips */}
            {currentPair.avaMsg.status === "complete" &&
              currentPair.avaMsg.followUps &&
              currentPair.avaMsg.followUps.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {currentPair.avaMsg.followUps.map((fu) => (
                    <FollowUpChip
                      key={fu.id}
                      label={fu.label}
                      onClick={() => handleFollowUp(fu.userMessage, fu.nextAnswerId)}
                    />
                  ))}
                </div>
              )}
          </>
        ) : null}

        {/* ── Input bar (appears after first interaction) ── */}
        {showInputBar && (
          <div
            style={{
              display: "flex",
              height: 40,
              alignItems: "center",
              background: COLOR.white,
              border: `1px solid ${COLOR.borderPrimary}`,
              borderRadius: 10,
              padding: 5,
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask a question"
              style={{
                flex: 1,
                border: "none",
                outline: "none",
                fontSize: 14,
                fontWeight: 500,
                color: COLOR.textPrimary,
                background: "transparent",
                paddingLeft: 8,
                fontFamily: FONT,
              }}
            />
            <button
              onClick={handleSend}
              style={{
                width: 30,
                height: 30,
                borderRadius: 6,
                background: "rgba(0,0,0,0.8)",
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              <SendIcon />
            </button>
          </div>
        )}
      </div>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <PoweredByFirework />

    </div>
  );
}
