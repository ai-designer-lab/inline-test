"use client";

import React, { useState } from "react";
import { AvaInlineWidget } from "../../../components/ava/AvaInlineWidget";
import { FONT, COLOR } from "../../../components/ava/tokens";

// ─── Color swatches (from Sijo PDP) ──────────────────────────────────────────
const SWATCHES = [
  { name: "Snow", hex: "#FFFFFF", border: "#e0e0e0" },
  { name: "Sand", hex: "#E8DDD0" },
  { name: "Fog", hex: "#D5D5D8" },
  { name: "Slate", hex: "#7E8491" },
  { name: "Sky", hex: "#B8CEDD" },
  { name: "Midnight", hex: "#3B4660" },
  { name: "Sage", hex: "#7B9E87" },
  { name: "Stone", hex: "#9E998E" },
  { name: "Mist", hex: "#C8D4D6" },
  { name: "Blush", hex: "#E8B4B0" },
  { name: "Petal", hex: "#F0C8C0" },
  { name: "Stripe", hex: "#D8D8D8", striped: true },
];

// ─── Feature badges ───────────────────────────────────────────────────────────
function FeatureBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 5,
        fontSize: 12,
        fontFamily: FONT,
        fontWeight: 500,
        color: "#3b5249",
      }}
    >
      <span style={{ fontSize: 14 }}>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ─── Star rating ──────────────────────────────────────────────────────────────
function StarRating({ rating, count }: { rating: number; count: string }) {
  return (
    <div
      style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12 }}
    >
      <div style={{ display: "flex", gap: 1 }}>
        {[1, 2, 3, 4, 5].map((s) => (
          <svg
            key={s}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill={s <= Math.round(rating) ? "#3b5249" : "#e0e0e0"}
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 21 12 17.77 5.82 21 7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>
      <span
        style={{
          fontFamily: FONT,
          fontSize: 12,
          color: "#666",
          fontWeight: 500,
        }}
      >
        {rating} · {count} Reviews
      </span>
    </div>
  );
}

// ─── Product image placeholder ────────────────────────────────────────────────
function ProductImage({
  label,
  badge,
  bg = "#f2f0eb",
}: {
  label?: string;
  badge?: string;
  bg?: string;
}) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        overflow: "hidden",
        aspectRatio: "1 / 1",
      }}
    >
      {/* linen texture simulation */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px), repeating-linear-gradient(90deg, transparent, transparent 3px, rgba(0,0,0,0.015) 3px, rgba(0,0,0,0.015) 4px)",
        }}
      />
      {label && (
        <span
          style={{
            fontFamily: FONT,
            fontSize: 11,
            color: "#aaa",
            position: "relative",
          }}
        >
          {label}
        </span>
      )}
      {badge && (
        <div
          style={{
            position: "absolute",
            top: 8,
            right: 8,
            background: "#fff",
            borderRadius: 4,
            padding: "3px 7px",
            fontSize: 10,
            fontFamily: FONT,
            fontWeight: 600,
            color: "#3b5249",
            boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
          }}
        >
          {badge}
        </div>
      )}
    </div>
  );
}

// ─── Sijo Nav ─────────────────────────────────────────────────────────────────
function SijoNav() {
  return (
    <header
      style={{
        borderBottom: "1px solid #e8e8e8",
        background: "#fff",
        position: "sticky",
        top: 0,
        zIndex: 20,
      }}
    >
      {/* Promo banner */}
      <div
        style={{
          background: "#d4e6df",
          textAlign: "center",
          padding: "8px 16px",
          fontFamily: FONT,
          fontSize: 12,
          fontWeight: 600,
          color: "#2a4a3e",
          letterSpacing: "0.04em",
        }}
      >
        LIMITED TIME | Save 20% Site Wide
      </div>

      {/* Main nav */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontFamily: FONT,
            fontSize: 22,
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "0.15em",
          }}
        >
          SIJO
        </div>

        {/* Nav links */}
        <nav
          style={{
            display: "flex",
            gap: 24,
            fontFamily: FONT,
            fontSize: 12,
            fontWeight: 600,
            color: "#3f4145",
            letterSpacing: "0.04em",
          }}
        >
          {[
            "BEST SELLERS",
            "SHEETS",
            "COMFORTERS + BLANKETS",
            "PILLOWS",
            "MATTRESS PADS",
            "LOUNGEWEAR",
            "FINAL SALE",
            "SHOP REFRESH",
          ].map((item) => (
            <span
              key={item}
              style={{ cursor: "pointer", whiteSpace: "nowrap" }}
            >
              {item}
            </span>
          ))}
        </nav>

        {/* Icons */}
        <div style={{ display: "flex", gap: 16, color: "#3f4145" }}>
          {["🔍", "👤", "🛒"].map((icon, i) => (
            <span key={i} style={{ cursor: "pointer", fontSize: 16 }}>
              {icon}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function InlineSandboxPage() {
  const [selectedSwatch, setSelectedSwatch] = useState(0);
  const [size, setSize] = useState("FULL");
  const [qty, setQty] = useState(1);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff",
        fontFamily: FONT,
        color: COLOR.textPrimary,
      }}
    >
      <div style={{ opacity: 0.4 }}><SijoNav /></div>

      {/* PDP layout */}
      <div
        style={{
          maxWidth: 960,
          margin: "0 auto",
          padding: "32px 24px 132px",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          gap: 40,
          alignItems: "start",
        }}
      >
        {/* ── Left: product images ─────────────────────────────────────── */}
        <div style={{ opacity: 0.4 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 8,
          }}
        >
          <ProductImage
            bg="#e8e4dc"
            badge="Best Sellers"
            label="lifestyle shot"
          />
          <div style={{ position: "relative" }}>
            <ProductImage bg="#f5f3ef" badge="20% Off Sale" label="product flat" />
            <div
              style={{
                position: "absolute",
                top: 8,
                left: 8,
                background: "#fff",
                borderRadius: 6,
                padding: "6px 8px",
                fontSize: 10,
                fontFamily: FONT,
                fontWeight: 700,
                color: "#2a5c4e",
                lineHeight: 1.3,
                textAlign: "center",
                boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ fontSize: 16 }}>★</div>
              Asthma &<br />
              Allergy<br />
              Friendly
            </div>
          </div>
          <ProductImage bg="#f0ede8" label="detail close-up" />
          <ProductImage bg="#ebe8e2" label="corner detail" />
        </div>
        </div>

        {/* ── Right: product info + AVA widget ────────────────────────── */}
        <div>
          <div style={{ opacity: 0.4 }}>
          {/* Breadcrumb label */}
          <p
            style={{
              fontFamily: FONT,
              fontSize: 11,
              fontWeight: 600,
              color: "#6b8f7e",
              margin: "0 0 6px 0",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            COOLING · EUCALYPTUS
          </p>

          {/* Title */}
          <h1
            style={{
              fontFamily: FONT,
              fontSize: 26,
              fontWeight: 700,
              color: "#1a1a1a",
              margin: "0 0 12px 0",
              lineHeight: 1.2,
            }}
          >
            AiryWeight Eucalyptus Sheet Set
          </h1>

          {/* Feature badges */}
          <div
            style={{
              display: "flex",
              gap: 16,
              marginBottom: 14,
              flexWrap: "wrap",
            }}
          >
            <FeatureBadge icon="❄" label="Cooling" />
            <FeatureBadge icon="✦" label="Antimicrobial" />
            <FeatureBadge icon="◇" label="Hypoallergenic" />
          </div>

          {/* Price + rating */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginBottom: 4,
            }}
          >
            <span
              style={{
                fontFamily: FONT,
                fontSize: 22,
                fontWeight: 700,
                color: "#1a1a1a",
              }}
            >
              $259
            </span>
            <span
              style={{
                fontFamily: FONT,
                fontSize: 12,
                color: "#6b8f7e",
                fontWeight: 500,
              }}
            >
              Save $51.80 · auto-applied in cart.
            </span>
          </div>
          <StarRating rating={4.8} count="3,037" />

          {/* Color */}
          <div style={{ marginBottom: 14 }}>
            <p
              style={{
                fontFamily: FONT,
                fontSize: 11,
                fontWeight: 700,
                color: "#888",
                margin: "0 0 8px 0",
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              COLOR{" "}
              <span style={{ fontWeight: 500, textTransform: "none" }}>
                {SWATCHES[selectedSwatch].name}
              </span>
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {SWATCHES.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setSelectedSwatch(i)}
                  title={s.name}
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: "50%",
                    background: s.hex,
                    border:
                      i === selectedSwatch
                        ? "2px solid #1a1a1a"
                        : `1px solid ${s.border ?? "#ddd"}`,
                    cursor: "pointer",
                    padding: 0,
                    outline:
                      i === selectedSwatch ? "2px solid #fff" : "none",
                    outlineOffset: "-3px",
                    boxSizing: "border-box",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Size dropdown */}
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                border: `1px solid ${COLOR.borderPrimary}`,
                borderRadius: 6,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>▭</span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  {size}
                </span>
              </div>
              <span style={{ color: "#888", fontSize: 12 }}>▾</span>
            </div>
          </div>

          {/* With flat sheet */}
          <div style={{ marginBottom: 16 }}>
            <div
              style={{
                border: `1px solid ${COLOR.borderPrimary}`,
                borderRadius: 6,
                padding: "10px 14px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 16 }}>▭</span>
                <span
                  style={{
                    fontFamily: FONT,
                    fontSize: 14,
                    fontWeight: 600,
                    color: "#1a1a1a",
                  }}
                >
                  WITH A FLAT SHEET
                </span>
              </div>
              <span style={{ color: "#888", fontSize: 12 }}>▾</span>
            </div>
          </div>

          {/* Qty + Add to Cart */}
          <div
            style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 24 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: `1px solid ${COLOR.borderPrimary}`,
                borderRadius: 6,
                height: 44,
                overflow: "hidden",
              }}
            >
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                style={{
                  width: 36,
                  height: "100%",
                  border: "none",
                  background: "none",
                  fontSize: 16,
                  cursor: "pointer",
                  color: "#1a1a1a",
                  fontFamily: FONT,
                }}
              >
                −
              </button>
              <span
                style={{
                  width: 28,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontSize: 14,
                  fontWeight: 600,
                }}
              >
                {qty}
              </span>
              <button
                onClick={() => setQty((q) => q + 1)}
                style={{
                  width: 36,
                  height: "100%",
                  border: "none",
                  background: "none",
                  fontSize: 16,
                  cursor: "pointer",
                  color: "#1a1a1a",
                  fontFamily: FONT,
                }}
              >
                +
              </button>
            </div>

            <button
              style={{
                flex: 1,
                height: 44,
                background: "#3b5249",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                fontFamily: FONT,
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                letterSpacing: "0.04em",
              }}
            >
              ADD TO CART
            </button>
          </div>

          </div>
          {/* ── AVA Inline Widget ────────────────────────────────────── */}
          <AvaInlineWidget />
        </div>
      </div>
    </div>
  );
}
