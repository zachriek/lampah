<template>
  <div class="card">
    <div :id="`${accrId}`" class="card-header">
      <h2 class="mb-0">
        <button
          class="btn btn-link btn-block btn-accr text-left text-success"
          type="button"
          data-toggle="collapse"
          :data-target="`#${accrTarget}`"
          aria-expanded="true"
          :aria-controls="`${accrTarget}`"
        >
          {{ title }}
        </button>
      </h2>
    </div>

    <div
      :id="`${accrTarget}`"
      class="collapse"
      :aria-labelledby="`${accrId}`"
      data-parent="#accordionExample"
    >
      <div class="card-body">
        {{ body }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AccordionCard',
  props: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    accrId: {
      type: String,
      required: true,
    },
    accrTarget: {
      type: String,
      required: true,
    },
  },
}
</script>

<style scoped>
.btn-accr:focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 255, 13, 0.25);
}
</style>
