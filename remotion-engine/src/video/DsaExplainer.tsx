import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

type Props = { title: string; subtitle: string };
const steps = [
  { label: "1. Find the node in the HashMap", code: "Node node = map.get(key);", detail: "Average O(1) lookup" },
  { label: "2. Detach it from its current position", code: "remove(node);", detail: "Update previous and next pointers" },
  { label: "3. Move it to the front", code: "addToFront(node);", detail: "Front = most recently used" },
  { label: "4. Return the stored value", code: "return node.value;", detail: "Get operation: O(1) average" },
];

export const DsaExplainer: React.FC<Props> = ({ title, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const stepIndex = Math.min(3, Math.floor(frame / (fps * 3.2)));
  const step = steps[stepIndex];
  const fade = interpolate(frame % (fps * 3.2), [0, 12], [0.4, 1], { extrapolateRight: "clamp" });
  const nodes = ["4", "7", "2"];
  return (
    <AbsoluteFill style={{ background: "#F7F8FC", color: "#14213D", fontFamily: "Inter, Arial, sans-serif", padding: 72 }}>
      <div style={{ fontSize: 24, letterSpacing: 5, color: "#64748B", fontWeight: 800 }}>DSA VISUALIZED · JAVA</div>
      <div style={{ marginTop: 60, fontSize: 76, lineHeight: 1.05, fontWeight: 900 }}>{title}</div>
      <div style={{ marginTop: 22, fontSize: 32, color: "#475569" }}>{subtitle}</div>
      <div style={{ marginTop: 120, fontSize: 25, color: "#64748B", fontWeight: 700 }}>MOST RECENTLY USED → LEAST RECENTLY USED</div>
      <div style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 35 }}>
        {nodes.map((n, i) => <React.Fragment key={n}>
          <div style={{ width: 170, height: 170, borderRadius: 28, background: i === stepIndex % 3 ? "#C9F2DE" : "#DDE7FF", border: "3px solid #CBD5E1", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 66, fontWeight: 900, opacity: fade }}>{n}</div>
          {i < nodes.length - 1 && <div style={{ fontSize: 42, color: "#64748B" }}>↔</div>}
        </React.Fragment>)}
      </div>
      <div style={{ marginTop: 95, padding: 34, borderRadius: 28, background: "#111827", color: "white", minHeight: 270 }}>
        <div style={{ fontSize: 25, color: "#94A3B8", fontWeight: 700 }}>JAVA · STEP {stepIndex + 1}/4</div>
        <div style={{ marginTop: 25, fontFamily: "monospace", fontSize: 31, color: "#A7F3D0" }}>{step.code}</div>
        <div style={{ marginTop: 26, fontSize: 29, fontWeight: 700 }}>{step.label}</div>
        <div style={{ marginTop: 14, fontSize: 24, color: "#CBD5E1" }}>{step.detail}</div>
      </div>
      <div style={{ position: "absolute", bottom: 65, left: 72, right: 72, display: "flex", justifyContent: "space-between", color: "#64748B", fontSize: 23 }}>
        <span>STRIVER A2Z · VISUAL LEARNING</span><span>{Math.min(100, Math.floor(frame / 4.5))}%</span>
      </div>
    </AbsoluteFill>
  );
};
