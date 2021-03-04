import React from "react";

export const Section: React.FC = React.memo(({ children }) => (
  <section
    style={{ padding: "2rem", margin: "1rem 0", border: "1px dashed #61dafb " }}
  >
    {children}
  </section>
));
