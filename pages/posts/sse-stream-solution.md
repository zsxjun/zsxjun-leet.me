---
title: 前端如何处理流式数据（SSE版）
date: 2025-04-28
duration: 12min
art: random
---

[[toc]]

## 开始之前...

最近又接到一个模块的需求，起初是需要跟后端对接ai对话的api，这是最初版的，当时还是用的其他的返回格式 `application/x-ndjson`。

但是由于最近的deepseek，后端又将ai换成了deepseek的了，deepseek的返回格式是 `text/event-stream`，用的协议是 `SSE (Server-Sent Events)`。

## 返回数据格式

可以参考[deepseek api文档](https://api-docs.deepseek.com/zh-cn/api/create-chat-completion)，可知我们需要处理的数据的格式是怎样的：

```text
data: {"id": "1f633d8bfc032625086f14113c411638", "choices": [{"index": 0, "delta": {"content": "", "role": "assistant"}, "finish_reason": null, "logprobs": null}], "created": 1718345013, "model": "deepseek-chat", "system_fingerprint": "fp_a49d71b8a1", "object": "chat.completion.chunk", "usage": null}

data: {"choices": [{"delta": {"content": "Hello", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": "!", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " How", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " can", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " I", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " assist", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " you", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": " today", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": "?", "role": "assistant"}, "finish_reason": null, "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1"}

data: {"choices": [{"delta": {"content": "", "role": null}, "finish_reason": "stop", "index": 0, "logprobs": null}], "created": 1718345013, "id": "1f633d8bfc032625086f14113c411638", "model": "deepseek-chat", "object": "chat.completion.chunk", "system_fingerprint": "fp_a49d71b8a1", "usage": {"completion_tokens": 9, "prompt_tokens": 17, "total_tokens": 26}}

data: [DONE]
```

::: tip
要注意的是每一条数据之间都是有`\n\n`分隔的，标准SSE事件，每条事件就是用'\n\n'分隔的。这个信息在后面处理数据时有用。
:::

## 处理方法

其实这个在网上搜索就知道了，我也看过，很多答案都是用一个前端的API `EventSource` 来处理的，或者就是用 event-source 的改库 `event-source-polyfill`。

`EventSource` 限制在于只能使用 'GET' 方法，请求需要的参数都只能明文传输。

`event-source-polyfill` 虽然是基于（XHR）的版本，理论上我们是可以改造xhr来发post请求的。但是为了兼容SSE协议规范，还是会默认使用get方法；另外就算可以模拟post请求，但也已经偏离了标准SSE，相当于自己造轮子了。

我的原则是还是少用点库，有些能自己解决就更好。

所有我还是用常规请求，用fetch和axios都可以，但是fetch是原生支持SSE的，用axios需要指定下适配器 `adapter`。

## 代码实现

### 请求方法

先找你的后端拿到对应的接口地址先。

```js
// const params = {}

const response = await fetch('/v1/chat/completions', {
  method: 'POST',
  body: JSON.stringify(params), // 需要序列化
  headers: {
    'Content-Type': 'application/json',
  },
})
```

::: details axios版
```js
const response = await axios.post('/v1/chat/completions', params, {
  responseType: 'stream', // axios 需要指定响应格式
  adapter: 'fetch'
})
```
:::

### 解析流数据

返回的数据打印你看不到内容，只能知道它是一个 [`ReadableStream`](https://developer.mozilla.org/zh-CN/docs/Web/API/ReadableStream)。最简单的处理方式就是：

```js
const reader = response.body.getReader()

let data = ''

while (true) {
  const { done, value } = await reader.read()
  if (done)
    break

  data += new TextDecoder().decode(value)
}
```

这就是一个常用的办法来处理的。但是吧，这应该是针对后端已经帮你处理好了ai api返回的数据，能直接使用的。如果是原始的[数据格式](#返回数据格式)，那还需要我们自己处理一下。

::: tip
如果是 axios 那么是通过 response.data
:::

接下来我还是用更加完善的另一种方法实现数据处理。

在mdn文档中还看得到另外一种处理流的方法，就是异步的for循环：

```js
for await (const chunk of response.body) {
  // ...
}
```

现在是需要将 `response.body` 改造成遍历后能直接使用的数据，而不是这一串字符串。

> data: {"id": "1f633d8bfc032625086f14113c411638", "choices": [{"index": 0, "delta": {"content": "", "role": "assistant"}, "finish_reason": null, "logprobs": null}], "created": 1718345013, "model": "deepseek-chat", "system_fingerprint": "fp_a49d71b8a1", "object": "chat.completion.chunk", "usage": null}

需要先了解几个方法：

- `TextDecoderStream`

这个方法跟`TextDecoder`是类似的，不同就在于`TextCoder`是一次性拿到完整二进制数据解析成文本；而`TextDecoderStream`则是实时将数据流转成文本流（边传边解析）。不过`TextDecoder`也可以实现，只不过需要`{ stream: true }`手动模拟流。

- `pipeThrough(transformStream, option)`
> 提供将当前流管道输出到一个转换（transform）流或可写/可读流对的链式方法。

就是把一个流的数据通过转换流处理一下，输出新的流。通俗讲就是对流的数据边收边改、边流边处理。
跟`TextDecoder`的read和write类似，只不过更方便更现代化。

- `new TransformStream({})`

这个就是`pipeThrough`需要用到的转换流对象，它包含了`transform`(每一段流的处理过程)和`flush`(接收完所有流后的收尾工作)

**具体实现**

```js
function transformStream(readableStream) {
  const decoderStream = new TextDeCoderStream()

  const stream = readableStream
    .pipeThrough(decoderStream)
    .pipeThrough(function () {
      let buffer = ''
      return new TransformStream({
        transform(streamChunk, controller) {
          buffer += streamChunk

          const parts = buffer.split('\n\n')
          parts.slice(0, -1).forEach((part) => {
            controller.enqueue(part)
          })

          buffer = parts[parts.length - 1]
        },
        flush(controller) {
          if ((buffer ?? '').trim() !== '') {
            controller.enqueue(buffer)
          }
        }
      })
    }())
    .pipeThrough(new TransformStream({
      transform(chunk, controller) {
        const lines = chunk.split('\n')
        const sseEvent = lines.reduce((acc, line) => {
          const separatorIndex = line.indexOf(':')
          if (separatorIndex === -1) {
            throw new Error('The key-value separator ":" is not found in the sse line chunk!')
          }

          const key = line.slice(0, separatorIndex)
          const value = line.slice(separatorIndex + 1)

          return {
            ...acc,
            [key]: value
          }
        }, {})

        if (Object.keys(sseEvent).length === 0)
          return

        controller.enqueue(sseEvent)
      }
    }))

  return stream
}
```

**步骤解析**

1. 第一个 `pipeThrough()`

这个步骤目的是将原始的二进制流转成字符串流。这个二进制流你可以通过浏览器F12，在network栏查看流请求的二进制数据。

`Uint8Array([100, 97, 116, 97, 58, 32, 123, ...])` => `"data: {\"id\": \"1f633...\"}"`

2. 第二个 `pipeThrough()`

这个步骤目的是将完整的字符串切成每条独立的SSE消息。
最后一条消息也同样是有`\n\n`分隔符的，所以最后一项一定是空字符串，所以处理的时候要排除掉最后一项的空字符串。

3. 第三个 `pipeThrough()`

这个步骤目的是将每条SSE消息字符串解析成一个对象。
因为每条SSE消息可能会包含多个data行的，它们通过'\n'分隔。拆分后，再通过`reduce`方法或其他办法处理成一个对象 `{ data: "{...}" }`。

最后在异步for循环中遍历得到的 `chunk` 就是处理后的数据: `{ data: "{...}" }`。

::: tip
其实还可以最后一层的transform()处理一下，把data的值解析成一个对象

```js
const parsed = JSON.parse(sseEvent.data)

// controller.enqueue(sseEvent) 改成
controller.enqueue(parsed)
```
:::

### 处理解析后的结果

```js
let fullContent = ''

for await (const chunk of transformStream(response.body)) {
  const { data } = chunk

  // 返回的字符串流，它们可能会包含一个空格符在前面 eg: "id": "1f633d8bfc032625086f14113c411638"
  if (data.trim() === '[DONE]')
    break

  const parsed = JSON.parse(data)
  const content = parse.choices[0].delta.content ?? '' // 具体格式看你请求具体返回

  fullContent += content
}
```

这就可以逐步拿到整个内容了！

## 代码优化

这样看着很冗长，我们可以拆分业务到单独的方法中去（这里我把三个方法拆分开看这方便一点）：

::: code-group

```js [index.js]
async function handleStream() {
  const params = {}

  const response = await fetchStream(params)

  for await (const chunk of transformStream(response.body)) {
    // ...
  }
}

function transformStream(readablesStream) {
  const decoderStream = new TextCoderStream()

  const stream = readableStream
    .pipeThrough(decoderStream)
    .pipeThrough(splitStream())
    .pipeThrough(splitParts())

  return stream
}
```

```js [splitStream]
function splitStream() {
  let buffer = ''
  return new TransformStream({
    transform(streamChunk, controller) {
      buffer += streamChunk

      const parts = buffer.split('\n\n')
      parts.slice(0, -1).forEach((part) => {
        controller.enqueue(part)
      })

      buffer = parts[parts.length - 1]
    },
    flush(controller) {
      if ((buffer ?? '').trim() !== '') {
        controller.enqueue(buffer)
      }
    }
  })
}
```

``` js [splitParts]
function splitParts() {
  return new TransformStream({
    transform(chunk, controller) {
      const lines = chunk.split('\n')
      const sseEvent = lines.reduce((acc, line) => {
        const separatorIndex = line.indexOf(':')
        if (separatorIndex === -1) {
          throw new Error('The key-value separator ":" is not found in the sse line chunk!')
        }

        const key = line.slice(0, separatorIndex)
        const value = line.slice(separatorIndex + 1)

        return {
          ...acc,
          [key]: value
        }
      }, {})

      if (Object.keys(sseEvent).length === 0)
        return

      controller.enqueue(sseEvent)
    }
  })
}
```

```js [fetchStream]
async function fetchStream(params) {
  const response = await fetch('/v1/chat/completions', {
    method: 'POST',
    body: JSON.stringify(params), // 需要序列化
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return response
}
```

:::

这样最终版本就完成了。这个版本优势我觉得在于还可以进一步封装来支持其他协议的流，做到真正通用的处理流数据的方法。
