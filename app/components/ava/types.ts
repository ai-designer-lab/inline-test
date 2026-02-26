export type MessageRole = "user" | "ava";

export type MessageStatus = "loading" | "reasoning" | "streaming" | "complete";

export interface FeedbackState {
  vote: "up" | "down" | null;
  panelOpen: boolean;
  tags: string[];
  text: string;
  submitted: boolean;
}

export interface Message {
  id: string;
  role: MessageRole;
  text: string;
  status: MessageStatus;
  answerId?: string;
  followUps?: Array<{
    id: string;
    label: string;
    userMessage: string;
    nextAnswerId: string;
  }>;
  feedback?: FeedbackState;
}

export interface CSATState {
  shown: boolean;
  rating: number | null;
  submitted: boolean;
}

export type FeedbackVariant = "inline" | "popup";
