<template>
  <div class="search-block p-2 border-2 my-6 relative shadow-lg">
    <p class="absolute -top-4 left-4 bg-white px-2">
      Find Parkings
    </p>
    <div class="flex flex-col sm:flex-row  space-y-4 sm:space-x-4 sm:space-y-0 search-block__content pt-8">
      <div class="from-block">
        <span>From</span>
        <client-only>
          <date-picker
            v-model="from"
            :disabled-dates="disabledFromDates"
            placeholder="MM/DD/YYYY"
            format="MM/dd/yyyy"
            @selected="fromSelected"
          />
        </client-only>
      </div>
      <div class="to-block">
        <span>To</span>
        <client-only>
          <date-picker
            v-model="to"
            :disabled-dates="disabledToDates"
            placeholder="MM/DD/YYYY"
            format="MM/dd/yyyy"
          />
        </client-only>
      </div>
      <div class="search-block flex">
        <button :disabled="!from || !to" class="w-full inline-block btn btn-blue sm:self-end disabled:opacity-50" @click="search(from, to)">
          Search Parkings
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'SearchBlock',
  data () {
    return {
      from: new Date(),
      to: null,
      disabledFromDates: {
        to: new Date(Date.now() - 8640000)
      }
    }
  },
  computed: {
    disabledToDates () {
      return {
        to: this.from
      }
    }
  },
  methods: {
    fromSelected (val) {
      // check if from more then to
      if (this.to && moment(this.to).format('X') < moment(val).format('X')) {
        this.to = null
      }
    },
    search (from, to) {
      this.$axios
        .get(`api/parkinglist?from=${moment(from).format('YYYY-MM-DD')}&to=${moment(to).format('YYYY-MM-DD')}`)
        .then((response) => {
          this.$emit('seList', response.data.available)
        })
        .catch((error) => {
          console.log('er', error)
        })
    }
  }
}
</script>

<style scoped>
.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
</style>
