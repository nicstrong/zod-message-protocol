# `zod-message-schema`

Gives you type-safe message passing (using Zod!) between two different environments.
Based on Matt Pocock's [video](https://www.youtube.com/watch?v=aKTSC4D1GL8).

```ts
// scehma.ts

const scehma = createMessageSchema({
  events: {
    LOG_IN: {
      username: z.string(),
      password: z.string(),
    },
    LOG_OUT: {},
  },
});

// iframe.ts

// Type safe sender!
const sendToParent = scehma.createHandler(window.parent.postMessage);

// Type safe receiver!
const handleParentEvent = scehma.createHandler((event) => {
  console.log(event);
});
window.addEventListener("message", (event) => {
  handleParentEvent(event.data);
});

// parent.ts

const iframe = document.querySelector('iframe')

const sendToChild = scehma.createHandler(iframe!.contentWindow!.postMessage)

```

## Installation

`pnpm add zod-message-schema`

`npm i zod-message-schema`

`yarn add zod-message-schema`