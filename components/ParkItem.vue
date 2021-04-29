<template>
  <div class="park-item border-2 mb-2 border-black justify-between p-2 flex items-center space-x-4 shadow-lg">
    <div class="park-item__name">
      {{ name }}
    </div>
    <div class="park-item__price flex space-x-4">
      <div class="currency">
        {{ currency }}
      </div>
      <div>
        {{ price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ParkItem',
  props: {
    price: {
      type: String,
      default: '0'
    },
    currency: {
      type: String,
      default: 'EUR'
    },
    name: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
