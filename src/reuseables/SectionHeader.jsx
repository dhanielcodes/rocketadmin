import React from "react";

export default function SectionHeader({ title, desc }) {
  return (
    <div>
      <div
        style={{
          fontSize: "20px",
          fontWeight: "600",
        }}
      >
        {title}
      </div>
      <div>{desc}</div>
    </div>
  );
}
