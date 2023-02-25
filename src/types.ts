import { z } from 'zod'

export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type EventsConfigToDiscriminatedUnion<T extends Record<string, z.ZodRawShape>> = Prettify<
  {
    [K in keyof T]: {
      type: K
    } & z.infer<z.ZodObject<T[K]>>
  }[keyof T]
>
