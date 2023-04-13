import { config } from "dotenv";
import { z } from "zod";

config()

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  REACT_APP_API_KEY: z.string(),
  REACT_APP_AUTH_DOMAIN: z.string(),
  REACT_APP_PROJECT_ID: z.string(),
  REACT_APP_STORAGE_BUCKET: z.string(),
  REACT_APP_MESSAGING_SENDER_ID: z.string(),
  REACT_APP_APP_ID: z.string(),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error(
    '😵😵😵 Oh no! Invalid environment variables!',
    _env.error.format(),
  )

  throw new Error('Invalid environment variables!')
}

export const env = _env.data
