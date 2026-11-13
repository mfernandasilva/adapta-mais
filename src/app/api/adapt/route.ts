import { NextResponse } from "next/server";
import { z } from "zod";
import { ValidationError } from "@/core/domain/errors";
import { createAdaptActivityUseCase } from "@/infrastructure/container";
import { toErrorResponse } from "../error-response";

export const runtime = "nodejs";
export const maxDuration = 60;

const requestSchema = z.object({
  text: z.string(),
  profileId: z.string(),
});

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json().catch(() => null);
    const parsed = requestSchema.safeParse(body);
    if (!parsed.success) {
      throw new ValidationError("Envie um JSON com 'text' e 'profileId'.");
    }

    const { activity, profile } = await createAdaptActivityUseCase().execute(parsed.data);

    return NextResponse.json({
      activity,
      profile: { id: profile.id, label: profile.label, visual: profile.visual },
    });
  } catch (error) {
    return toErrorResponse(error);
  }
}
