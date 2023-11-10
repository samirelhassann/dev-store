/* eslint-disable no-console */
import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_BASE_URL: z.string().url(),
  NEXT_PUBLIC_API_PREFIX: z.string(),
  APP_URL: z.string(),
});

const parsedEnvs = envSchema.safeParse(process.env);

if (!parsedEnvs.success) {
  console.error(
    "Invalid environment variables",
    parsedEnvs.error.flatten().fieldErrors
  );

  throw new Error("Invalid environment variables");
}

export const env = parsedEnvs.data;
