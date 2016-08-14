import Vue from 'vue'

new Vue({
  el: '#roth-calculator',
  data: {
    result: '???',
    income: '52000',
    age: '25',
    filing_status: 'single'
  },
  methods: {
    calculate: function (event) {
      // Checking to see if they are too old
      if (this.age >= 70.5) {
        this.result = 0
        return
      }

      // Getting base limit
      var base_limit = 5500
      if (this.age >= 50) {
        base_limit = 6500
      }

      if(this.filing_status === 'jointly' || this.filing_status === 'widow') {
        if(this.income < 184000) {
          this.result = Math.min(this.income, base_limit);
        } else if(this.income >= 184000 && this.income < 194000) {
          this.result = (1.0  - ((this.income - 184000) / 10000)) * base_limit
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'mfs-lived-with') {
        if(this.income < 10000) {
          var max_result = (1.0  - (this.income / 10000)) * base_limit
          this.result = Math.min(this.income, max_result)
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'single' || this.filing_status === 'mfs-lived-without') {
        if(this.income < 117000) {
          this.result = Math.min(this.income, base_limit);
        } else if(this.income >= 117000 && this.income < 132000) {
          this.result = (1.0  - ((this.income - 117000) / 15000)) * base_limit
        } else {
          this.result = 0
        }
      }
    }
  }
})

Vue.filter('currency', function (value) {
    return '$'+value.toFixed(2)
})
