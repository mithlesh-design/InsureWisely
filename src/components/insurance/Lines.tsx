import { Fragment } from "react";

// Copy with the Figma frame's manual line breaks; the breaks only render at full width (.ti-lg-break)
export function Lines({ lines }: { lines: string[] }) {
  return <>{lines.map((line, i) => <Fragment key={i}>{i > 0 && <>{" "}<br className="ti-lg-break" /></>}{line}</Fragment>)}</>;
}
