import Vue from 'vue'

new Vue({
  el: '#roth-calculator',
  data: {
    result: '???',
    magi: '52000',
    taxable_compensation: '52000',
    age: '25',
    filing_status: 'single'
  },
  methods: {
    calculate: function (event) {
      // Getting base limit
      var base_limit = 5500
      if (this.age >= 50) {
        base_limit = 6500
      }

      if(this.filing_status === 'jointly' || this.filing_status === 'widow') {
        if(this.magi < 184000) {
          this.result = Math.min(this.taxable_compensation, base_limit);
        } else if(this.magi >= 184000 && this.magi < 194000) {
          this.result = (1.0  - ((this.magi - 184000) / 10000)) * base_limit
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'mfs-lived-with') {
        if(this.magi < 10000) {
          var max_result = (1.0  - (this.magi / 10000)) * base_limit
          this.result = Math.min(this.taxable_compensation, max_result)
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'single' || this.filing_status === 'mfs-lived-without') {
        if(this.magi < 117000) {
          this.result = Math.min(this.taxable_compensation, base_limit);
        } else if(this.magi >= 117000 && this.magi < 132000) {
          this.result = (1.0  - ((this.magi - 117000) / 15000)) * base_limit
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
