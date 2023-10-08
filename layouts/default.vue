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
}
</script>
