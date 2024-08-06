---
title: typescript笔记
date: 2024-08-06
duration: 3min
type: notes
art: random
---

###### `T[number]`

作用是用来获取数组或元组类型 `T` 中的所有元素类型:

```ts
type foo = string[]

type tuple = ['123', 123]

type ElementType = foo[number] // string

type ElementType = tuple[numer] // string | number
```

###### `PropertyKey`

表示 `string | number | symbol` 的联合类型
