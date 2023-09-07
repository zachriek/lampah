<template>
  <b-card
    :title="title"
    img-src="https://source.unsplash.com/random/600x300/?trash"
    img-alt="Image"
    img-top
    class="shadow-sm"
  >
    <b-card-text>
      {{ body }}
    </b-card-text>
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
  },
}
</script>
