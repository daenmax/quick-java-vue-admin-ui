<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiDoc',
  data() {
    return {
      url: process.env.VUE_APP_API_DOC_URL
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
