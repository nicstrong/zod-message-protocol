import { describe, expect, it, vitest } from 'vitest'
import { z } from 'zod'
import { createMessageSchema } from '.'

const schema = createMessageSchema({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
})

describe('createMessageSchema', () => {
  it('should error on send if not matched by the schema', () => {
    const testSender = vitest.fn()
    const sender = schema.createHandler(testSender)
    expect(() =>
      // @ts-expect-error
      sender({ type: 'LOG_IN' })
    ).toThrow()
    expect(testSender).not.toHaveBeenCalled()
  })

  it('should pass if sent messaage matches the schema', () => {
    const testSender = vitest.fn()
    const sender = schema.createHandler(testSender)

    sender({
      type: 'LOG_IN',
      password: 'password',
      username: 'username',
    })

    expect(testSender).toHaveBeenCalledWith({
      type: 'LOG_IN',
      username: 'username',
      password: 'password',
    })

    expect(testSender).toHaveBeenCalledOnce()
  })
})
