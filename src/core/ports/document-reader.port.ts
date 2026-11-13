export interface DocumentReader {
  supports(mimeType: string): boolean;
  read(file: Buffer): Promise<string>;
}
