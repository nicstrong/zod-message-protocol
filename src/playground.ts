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

// iframe.ts

const sendToParent = messageSchema.createHandler(window.parent.postMessage)

const handleParentEvent = messageSchema.createHandler((event) => {
  console.log(event)
})

window.addEventListener('message', (event) => {
  handleParentEvent(event.data)
})

// parent.ts

const iframe = document.querySelector('iframe')

const sendToChild = messageSchema.createHandler(iframe!.contentWindow!.postMessage)
