"use client";

import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";
import { FONT, COLOR } from "./tokens";

const T = {
  answerTitle: {
    fontFamily: FONT,
    fontSize: "1.25em",
    fontWeight: 600,
    lineHeight: 1.3,
    color: COLOR.textPrimary,
    margin: "0 0 12px 0",
  },
  h2: {
    fontFamily: FONT,
    fontSize: "1.125em",
    fontWeight: 600,
    lineHeight: 1.333,
    color: COLOR.textPrimary,
    margin: "20px 0 8px 0",
  },
  h3: {
    fontFamily: FONT,
    fontSize: "1em",
    fontWeight: 600,
    lineHeight: 1.375,
    color: COLOR.textPrimary,
    margin: "16px 0 6px 0",
  },
  body: {
    fontFamily: FONT,
    fontSize: "1em",
    fontWeight: 500,
    lineHeight: 1.5,
    color: COLOR.textPrimary,
  },
  bold: {
    fontFamily: FONT,
    fontSize: "1em",
    fontWeight: 700,
    lineHeight: 1.5,
    color: COLOR.textPrimary,
  },
  inlineCode: {
    fontFamily: "monospace",
    fontSize: "0.8125em",
    fontWeight: 500,
    lineHeight: 1.384,
    background: COLOR.greyscale100,
    borderRadius: 3,
    padding: "1px 4px",
  },
};

interface MarkdownAnswerProps {
  markdown: string;
}

export function MarkdownAnswer({ markdown }: MarkdownAnswerProps) {
  const components = useMemo((): Components => {
    let firstH1Seen = false;
    return {
      h1({ children }) {
        if (!firstH1Seen) {
          firstH1Seen = true;
          return <div style={T.answerTitle as React.CSSProperties}>{children}</div>;
        }
        return <div style={T.h2 as React.CSSProperties}>{children}</div>;
      },
      h2({ children }) {
        return <div style={T.h2 as React.CSSProperties}>{children}</div>;
      },
      h3({ children }) {
        return <div style={T.h3 as React.CSSProperties}>{children}</div>;
      },
      h4({ children }) {
        return <span style={T.body as React.CSSProperties}>{children}</span>;
      },
      h5({ children }) {
        return <span style={T.body as React.CSSProperties}>{children}</span>;
      },
      h6({ children }) {
        return <span style={T.body as React.CSSProperties}>{children}</span>;
      },
      p({ children }) {
        return (
          <p style={{ ...(T.body as React.CSSProperties), margin: "0 0 12px 0" }}>
            {children}
          </p>
        );
      },
      strong({ children }) {
        return <strong style={T.bold as React.CSSProperties}>{children}</strong>;
      },
      a({ href, children }) {
        return (
          <a
            href={href}
            style={{ color: COLOR.textPrimary, textDecoration: "none" }}
            onMouseEnter={(e) => (e.currentTarget.style.textDecoration = "underline")}
            onMouseLeave={(e) => (e.currentTarget.style.textDecoration = "none")}
          >
            {children}
          </a>
        );
      },
      code({ children, className }) {
        const isBlock = className?.startsWith("language-");
        return (
          <code
            style={{
              ...(T.inlineCode as React.CSSProperties),
              ...(isBlock
                ? { display: "block", padding: "8px 12px", borderRadius: 6, overflowX: "auto", marginBottom: 12 }
                : {}),
            }}
          >
            {children}
          </code>
        );
      },
      blockquote({ children }) {
        return (
          <blockquote
            style={{
              ...(T.body as React.CSSProperties),
              borderLeft: `3px solid ${COLOR.greyscale200}`,
              paddingLeft: 12,
              margin: "12px 0",
              color: COLOR.textSecondary,
            }}
          >
            {children}
          </blockquote>
        );
      },
      ul({ children }) {
        return <ul style={{ margin: "0 0 12px 0", paddingLeft: 20 }}>{children}</ul>;
      },
      ol({ children }) {
        return <ol style={{ margin: "0 0 12px 0", paddingLeft: 20 }}>{children}</ol>;
      },
      li({ children }) {
        return (
          <li style={{ ...(T.body as React.CSSProperties), marginBottom: 8 }}>
            {children}
          </li>
        );
      },
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [markdown]);

  return (
    <div style={{ color: COLOR.textPrimary, fontFamily: FONT, fontSize: 16 }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
