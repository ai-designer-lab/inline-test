"use client";

import React, { useEffect, useRef } from "react";
import { AnswerCard } from "./AnswerCard";
import { CSATPrompt } from "./CSATPrompt";
import type { Message, CSATState } from "./types";

interface ConversationThreadProps {
  messages: Message[];
  csat: CSATState;
  reasoningStep: number;
  onVote: (messageId: string, vote: "up" | "down") => void;
  onFeedbackSubmit: (messageId: string, tags: string[], text: string) => void;
  onFeedbackClose: (messageId: string) => void;
  onFollowUp: (userMessage: string, nextAnswerId: string) => void;
  onCSATRate: (rating: number) => void;
}

export function ConversationThread({
  messages,
  csat,
  reasoningStep,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
  onFollowUp,
  onCSATRate,
}: ConversationThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Build render list: interleave CSAT after the second AVA answer
  const renderItems: Array<{ type: "message"; msg: Message } | { type: "csat" }> = [];
  let avaCount = 0;
  let csatInserted = false;

  for (const msg of messages) {
    renderItems.push({ type: "message", msg });
    if (msg.role === "ava" && msg.status === "complete") {
      avaCount++;
      if (avaCount === 2 && !csatInserted) {
        renderItems.push({ type: "csat" });
        csatInserted = true;
      }
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {renderItems.map((item, idx) => {
        if (item.type === "csat") {
          return (
            <CSATPrompt
              key={`csat-${idx}`}
              csat={csat}
              onRate={onCSATRate}
              onDismiss={() => {}}
            />
          );
        }

        const { msg } = item;

        if (msg.role === "user") {
          return (
            <div key={msg.id} style={{ display: "flex", justifyContent: "flex-end" }}>
              <div
                style={{
                  maxWidth: "80%",
                  padding: "8px 12px",
                  background: "#f0f0f0",
                  borderRadius: "12px 12px 2px 12px",
                  fontSize: "0.875em",
                  lineHeight: 1.45,
                  color: "#3F4145",
                }}
              >
                {msg.text}
              </div>
            </div>
          );
        }

        return (
          <AnswerCard
            key={msg.id}
            message={msg}
            reasoningStep={reasoningStep}
            onVote={onVote}
            onFeedbackSubmit={onFeedbackSubmit}
            onFeedbackClose={onFeedbackClose}
            onFollowUp={onFollowUp}
          />
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
