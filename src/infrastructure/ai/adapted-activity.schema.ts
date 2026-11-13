import { Type, type Schema } from "@google/genai";
import { z } from "zod";

export const GEMINI_RESPONSE_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    title: { type: Type.STRING },
    passage: { type: Type.ARRAY, items: { type: Type.STRING } },
    instructions: { type: Type.ARRAY, items: { type: Type.STRING } },
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          number: { type: Type.INTEGER },
          statement: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
        },
        required: ["number", "statement"],
      },
    },
    teacherNotes: { type: Type.STRING },
  },
  required: ["title", "passage", "instructions", "questions"],
};

export const aiAdaptedActivitySchema = z.object({
  title: z.string().min(1),
  passage: z.array(z.string().min(1)).default([]),
  instructions: z.array(z.string().min(1)),
  questions: z
    .array(
      z.object({
        number: z.number().int().positive(),
        statement: z.string().min(1),
        options: z.array(z.string().min(1)).nullish(),
      }),
    )
    .min(1),
  teacherNotes: z.string().nullish(),
});

export type AiAdaptedActivity = z.infer<typeof aiAdaptedActivitySchema>;