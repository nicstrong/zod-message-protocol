import { z } from 'zod'
import { createMessageSchema } from '.'

const messageSchema = createMessageSchema({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
})

const sender = messageSchema.createHandler(window.postMessage)

sender({ type: 'LOG_IN', username: 'foo', password: 'bar' })
sender({ type: 'LOG_OUT' })
