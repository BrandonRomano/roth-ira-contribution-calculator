import Vue from 'vue'


// Jointly or Widow
const jointPhaseOutBegin = 186000
const jointPhaseOutEnd = 196000

// Single
const singlePhaseOutBegin = 118000
const singlePhaseOutEnd = 133000

// Married Filing separately + lived with eachother
const mfsCutoff = 10000

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
        if(this.magi < jointPhaseOutBegin) {
          this.result = Math.min(this.taxable_compensation, base_limit);
        } else if(this.magi >= jointPhaseOutBegin && this.magi < jointPhaseOutEnd) {
          this.result = (1.0  - ((this.magi - jointPhaseOutBegin) / (jointPhaseOutEnd - jointPhaseOutBegin))) * base_limit
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'mfs-lived-with') {
        if(this.magi < mfsCutoff) {
          var max_result = (1.0  - (this.magi / mfsCutoff)) * base_limit
          this.result = Math.min(this.taxable_compensation, max_result)
        } else {
          this.result = 0
        }
      }
      else if(this.filing_status === 'single' || this.filing_status === 'mfs-lived-without') {
        if(this.magi < singlePhaseOutBegin) {
          this.result = Math.min(this.taxable_compensation, base_limit);
        } else if(this.magi >= singlePhaseOutBegin && this.magi < singlePhaseOutEnd) {
          this.result = (1.0  - ((this.magi - singlePhaseOutBegin) / (singlePhaseOutEnd - singlePhaseOutBegin))) * base_limit
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
