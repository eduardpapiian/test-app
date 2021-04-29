<template>
  <div class="search-block p-2 border-2 my-6 relative shadow-lg">
    <p class="absolute -top-4 left-4 bg-white px-2">
      Find Parkings
    </p>
    <div class="flex flex-col sm:flex-row  space-y-4 sm:space-x-10 sm:space-y-0 search-block__content pt-8">
      <div class="from-block">
        <span>From</span>
        <client-only>
          <div class="flex items-center">
            <date-picker
              v-model="from"
              :disabled-dates="disabledFromDates"
              placeholder="MM/DD/YYYY"
              format="MM/dd/yyyy"
              @selected="fromSelected"
              input-class="datepicker-input"
            />
            <fa :icon="['fas', 'calendar-alt']" />
          </div>
        </client-only>
      </div>
      <div class="to-block">
        <span>To</span>
        <client-only>
          <div class="flex items-center">
            <date-picker
              v-model="to"
              :disabled-dates="disabledToDates"
              placeholder="MM/DD/YYYY"
              format="MM/dd/yyyy"
              :open-date="openDate"
              input-class="datepicker-input"
            />
            <fa :icon="['fas', 'calendar-alt']" />
          </div>
        </client-only>
      </div>
      <div class="search-block flex">
        <button :disabled="!from || !to" class="w-full text-sm h-8 inline-block btn btn-blue sm:self-end disabled:opacity-50" @click="search(from, to)">
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
      },
      openDate: new Date(Date.now() - 8650000)
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
      this.openDate = val
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

<style>
.btn {
  @apply font-bold px-4 rounded;
}
.btn-blue {
  @apply bg-blue-500 text-white;
}
.btn-blue:hover {
  @apply bg-blue-700;
}
.datepicker-input {
  cursor: pointer;
  padding: 4px;
  max-width: 120px;
  margin-right:4px;
}
</style>
