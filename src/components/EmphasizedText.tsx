import { parseEmphasis } from "@/core/domain/rich-text";

interface EmphasizedTextProps {
  readonly text: string;
}

export function EmphasizedText({ text }: EmphasizedTextProps) {
  return (
    <>
      {parseEmphasis(text).map((segment, index) =>
        segment.bold ? <strong key={index}>{segment.text}</strong> : segment.text,
      )}
    </>
  );
}