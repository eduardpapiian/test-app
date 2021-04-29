<template>
  <div class="container mx-auto flex justify-center">
    <div class="px-8 py-6 w-full sm:max-w-2xl">
      <h1 class="font-medium text-3xl">
        Shiphol NL Parking
      </h1>
      <search-block @seList="setAvailableList" />
      <park-item
        v-for="(value, name, index) in list"
        :key="index"
        :name="value.merchant.name"
        :currency="value.currency"
        :price="value.price"
      />
    </div>
  </div>
</template>

<script>
import SearchBlock from '~/components/SearchBlock'
import ParkItem from '~/components/ParkItem'
export default {
  components: { ParkItem, SearchBlock },
  data () {
    return {
      list: {}
    }
  },
  methods: {
    setAvailableList (list) {
      this.list = list
    }
  }
}
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
}
</style>
