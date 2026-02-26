"use client";

import React, { useEffect, useRef } from "react";
import { AnswerCard } from "./AnswerCard";
import type { Message } from "./types";

interface ConversationThreadProps {
  messages: Message[];
  reasoningStep: number;
  onVote: (messageId: string, vote: "up" | "down") => void;
  onFeedbackSubmit: (messageId: string, tags: string[], text: string) => void;
  onFeedbackClose: (messageId: string) => void;
  onFollowUp: (userMessage: string, nextAnswerId: string) => void;
}

export function ConversationThread({
  messages,
  reasoningStep,
  onVote,
  onFeedbackSubmit,
  onFeedbackClose,
  onFollowUp,
}: ConversationThreadProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {messages.map((msg) => {
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
