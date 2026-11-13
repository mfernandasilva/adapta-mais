import { z } from "zod";

const envSchema = z.object({
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY é obrigatória"),
  GEMINI_MODEL: z.string().min(1).default("gemini-3.6-flash"),
  GEMINI_FALLBACK_MODEL: z
    .string()
    .trim()
    .optional()
    .transform((value) => value || undefined),
  GEMINI_TIMEOUT_MS: z.coerce.number().int().positive().default(30000),
  MAX_INPUT_CHARS: z.coerce.number().int().positive().default(15000),
  MAX_UPLOAD_MB: z.coerce.number().positive().default(5),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

export function getEnv(): Env {
  if (!cachedEnv) {
    cachedEnv = envSchema.parse(process.env);
  }
  return cachedEnv;
}