export interface TextSegment {
  readonly text: string;
  readonly bold: boolean;
}

const EMPHASIS_PATTERN = /\[\[(.+?)\]\]/g;
const MARKDOWN_BOLD_PATTERN = /\*\*(.+?)\*\*/g;

export function parseEmphasis(input: string): TextSegment[] {
  const segments: TextSegment[] = [];
  let lastIndex = 0;

  for (const match of input.matchAll(EMPHASIS_PATTERN)) {
    const start = match.index ?? 0;
    if (start > lastIndex) {
      segments.push({ text: input.slice(lastIndex, start), bold: false });
    }
    segments.push({ text: match[1] ?? "", bold: true });
    lastIndex = start + match[0].length;
  }

  if (lastIndex < input.length) {
    segments.push({ text: input.slice(lastIndex), bold: false });
  }
  return segments;
}

export function stripEmphasis(input: string): string {
  return input.replace(EMPHASIS_PATTERN, "$1");
}

export function convertMarkdownBold(input: string): string {
  return input.replace(MARKDOWN_BOLD_PATTERN, "[[$1]]");
}