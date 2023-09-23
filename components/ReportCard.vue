<template>
  <b-card
    :title="title"
    :img-src="image"
    img-alt="Image"
    img-top
    class="shadow-sm"
  >
    <b-card-text>
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
