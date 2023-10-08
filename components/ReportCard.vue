<template>
  <b-card
    :title="title"
    :img-src="image ?? `https://source.unsplash.com/random/600x300/?trash`"
    img-alt="Image"
    img-top
    class="shadow-sm"
  >
    <b-card-sub-title>
      <NuxtLink
        v-if="username"
        :to="`/laporan/user/${username}`"
        style="color: inherit"
        >{{ author }}</NuxtLink
      >
      <template v-else>{{ author }}</template>
    </b-card-sub-title>
    <b-card-text class="mt-4">
      {{ body }}
    </b-card-text>
    <AppButton
      v-if="href"
      type="link"
      :text="buttonText"
      :href="href"
      variant="success"
      :icon="buttonIcon"
    />
  </b-card>
</template>

<script>
export default {
  name: 'ReportCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      default: '',
    },
    username: {
      type: String,
      default: null,
    },
    body: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: 'https://source.unsplash.com/random/600x300/?trash',
    },
    href: {
      type: String,
      default: null,
    },
    buttonIcon: {
      type: String,
      default: null,
    },
    buttonText: {
      type: String,
      default: null,
    },
  },
}
</script>
