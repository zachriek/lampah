<template>
  <div class="row loading-skeleton">
    <div
      v-for="i in Array.from(Array(count).keys())"
      :key="i"
      :class="
        size === 3
          ? `col-12 col-md-6 col-lg-4 mb-5`
          : size === 2
          ? `col-12 col-md-6 mb-5`
          : `col-12 mb-5`
      "
    >
      <b-card
        title="Card title"
        sub-title="Author"
        img-src="//placekitten.com/600/300"
        img-alt="..."
        img-top
      >
        <b-card-text class="mt-4">
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </b-card-text>
        <AppButton type="link" href="#" text="Go somewhere" variant="success" />
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardSkeletonLoading',
  props: {
    count: {
      type: Number,
      default: 3,
    },
    size: {
      type: Number,
      default: 3,
    },
  },
}
</script>
