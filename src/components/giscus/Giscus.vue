<script setup lang="ts">
import Giscus from '@giscus/vue'
import type {
  AvailableLanguage,
  BooleanString,
  InputPosition,
  Loading,
  Mapping,
  Repo,
  Theme,
} from './types'

defineProps<{
  id?: string
  host?: string
  repo: Repo
  repoId: string
  category?: string
  categoryId?: string
  mapping: Mapping
  term?: string
  theme?: Theme
  strict?: BooleanString
  reactionsEnabled?: BooleanString
  emitMetadata?: BooleanString
  inputPosition?: InputPosition
  lang?: AvailableLanguage
  loading?: Loading
}>()
</script>

<template>
  <Giscus
    :id="id"
    :host="host"
    :repo="repo"
    :repo-id="repoId"
    :category="category"
    :category-id="categoryId"
    :mapping="mapping"
    :term="term"
    :strict="strict"
    :reactions-enabled="reactionsEnabled"
    :emit-metadata="emitMetadata"
    :input-position="inputPosition"
    :theme="theme"
    :lang="lang"
    :loading="loading"
  />
</template>
