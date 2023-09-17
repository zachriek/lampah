<template>
  <NuxtLink
    v-if="type === 'link'"
    :to="href"
    :class="`btn btn-${variant} shadow-sm`"
  >
    <i :class="`bi bi-${icon}`"></i>
    <span>{{ text }}</span>
  </NuxtLink>
  <button v-else :type="type" :class="`btn btn-${variant} shadow-sm`">
    <i :class="`bi bi-${icon}`"></i>
    <span>{{ text }}</span>
  </button>
</template>

<script>
export default {
  name: 'AppButton',
  props: {
    text: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      default: '#',
    },
    variant: {
      type: String,
      default: 'success',
      validator(value) {
        return ['success', 'outline-success'].includes(value)
      },
    },
    icon: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'button',
      validator(value) {
        return ['button', 'link', 'submit'].includes(value)
      },
    },
  },
}
</script>
