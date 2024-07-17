<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router/auto'

const envId = 'https://famous-jalebi-5494fe.netlify.app/.netlify/functions/twikoo'
const twikooJs = ref(null)
const router = useRouter()

function initTwikoo() {
  twikoo.init({
    envId,
    onCommentLoaded: initLightGallery,
  })
}

function initLightGallery() {
  // This function is compiled to ES5
  const commentContents = document.getElementsByClassName('tk-content')
  for (let i = 0; i < commentContents.length; i++) {
    const commentItem = commentContents[i]
    const imgEls = commentItem.getElementsByTagName('img')
    if (imgEls.length > 0) {
      for (let j = 0; j < imgEls.length; j++) {
        const imgEl = imgEls[j]
        const aEl = document.createElement('a')
        aEl.setAttribute('class', 'tk-lg-link')
        aEl.setAttribute('href', imgEl.getAttribute('src'))
        aEl.setAttribute('data-src', imgEl.getAttribute('src'))
        aEl.appendChild(imgEl.cloneNode(false))
        imgEl.parentNode.insertBefore(aEl, imgEl.nextSibling)
        imgEl.remove()
      }
      lightGallery(commentItem, {
        selector: '.tk-lg-link',
        share: false,
      })
    }
  }
}

function initJs() {
  if (twikooJs.value) {
    twikooJs.value.onload = initTwikoo
    router.onAfterRouteChanged = onRoute
  }
}

function onRoute(to) {
  if (to)
    setTimeout(initTwikoo, 1000)
}

onMounted(() => {
  initTwikoo()
  initJs()
})
</script>

<template>
  <div class="comment-container vp-raw">
    <!-- Twikoo -->
    <div id="twikoo" />
  </div>
</template>
