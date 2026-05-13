"use client";

import { forwardRef } from "react";

const Section = forwardRef(({
  children,
  className = "",
  id,
}, ref) => {
  return (
    <section
      ref={ref}
      id={id}
      className={className}
    >
      <div className="container">{children}</div>
    </section>
  );
});

Section.displayName = "Section";
export default Section;
