import { z } from 'zod'
import { EventsConfigToDiscriminatedUnion } from './types'

export const createMessageSchema = <
  T extends Record<string, z.ZodRawShape>,
  EventsAsDiscoUnion = EventsConfigToDiscriminatedUnion<T>
>(opts: {
  events: T
}) => {
  return {
    creataeSender: (func: (event: EventsAsDiscoUnion) => void) => {
      return func
    },
    creataeHandler: (func: (event: EventsAsDiscoUnion) => void) => {
      return func
    },
  }
}
