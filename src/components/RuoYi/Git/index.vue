<template>
  <div>
    <svg-icon icon-class="qq" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'RuoYiGit',
  data() {
    return {
      url: process.env.VUE_APP_AUTHOR_QQ_JUMP
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>
