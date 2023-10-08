<template>
  <div>
    <AppHeader />
    <Nuxt />
    <AppFooter />
  </div>
</template>

<script>
export default {
  middleware: 'authenticated',
  mounted() {
    if (!this.$auth.loggedIn) {
      return this.$route.push('/login')
    }
  },
}
</script>
