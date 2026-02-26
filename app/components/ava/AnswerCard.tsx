"use client";

import React from "react";
import { MarkdownAnswer } from "./MarkdownAnswer";
import { ReasoningDot } from "./ReasoningDot";
import { AnswerFeedback } from "./FeedbackPanel";
import type { Message } from "./types";

interface AnswerCardProps {
  message: Message;
  reasoningStep: number;
  onVote: (messageId: string, vote: "up" | "down") => void;
  onFeedbackSubmit: (messageId: string, tags: string[], text: string) => void;
  onFeedbackClose: (messageId: string) => void;
  onFollowUp: (userMessage: string, nextAnswerId: string) => void;
}

export function AnswerCard({
  message,
  reasoningStep,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
  onFollowUp,
}: AnswerCardProps) {
  const isLoading = message.status === "loading";
  const isReasoning = message.status === "reasoning";
  const isStreaming = message.status === "streaming";
  const isComplete = message.status === "complete";

  return (
    <div style={{ padding: "2px 0" }}>
      {/* AVA label */}
      <div
        style={{
          fontSize: "0.75em",
          fontWeight: 600,
          color: "#aaa",
          marginBottom: 6,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
        }}
      >
        AVA
      </div>

      {/* Loading dots (before reasoning starts) */}
      {isLoading && (
        <div style={{ display: "flex", gap: 4, alignItems: "center", height: 20 }}>
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
      {isReasoning && (
        <ReasoningDot phase="reasoning" stepIndex={reasoningStep} />
      )}

      {/* Streaming phase */}
      {(isStreaming || isComplete) && (
        <div>
          <MarkdownAnswer markdown={message.text} />
          {isStreaming && <ReasoningDot phase="streaming" />}
        </div>
      )}

      {/* Follow-ups + feedback only after complete */}
      {isComplete && (
        <>
          {/* Feedback */}
          {message.feedback && (
            <AnswerFeedback
              feedback={message.feedback}
              onVote={(vote) => onVote(message.id, vote)}
              onFeedbackSubmit={(tags, text) =>
                onFeedbackSubmit(message.id, tags, text)
              }
              onFeedbackClose={() => onFeedbackClose(message.id)}
            />
          )}

          {/* Follow-up chips */}
          {message.followUps && message.followUps.length > 0 && (
            <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {message.followUps.map((fu) => (
                <button
                  key={fu.id}
                  onClick={() => onFollowUp(fu.userMessage, fu.nextAnswerId)}
                  style={{
                    padding: "6px 12px",
                    fontSize: "0.8125em",
                    border: "1px solid #e5e5e5",
                    borderRadius: 20,
                    background: "#fff",
                    color: "#3F4145",
                    cursor: "pointer",
                    transition: "border-color 0.15s, background 0.15s",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#3F4145";
                    e.currentTarget.style.background = "#f5f5f5";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#e5e5e5";
                    e.currentTarget.style.background = "#fff";
                  }}
                >
                  {fu.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
