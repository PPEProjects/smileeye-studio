import { defineComponent, h, reactive } from 'vue'

export default defineComponent({
  name: 'VmButton',
  setup() {
    const state = reactive({
      count: 0
    })

    const inc = () => {
      state.count++
      console.log('Update count: ', state.count)
    }

    return {
      state,
      inc
    }
  },

  render() {
    const result = h('span', [`Clicked ${this.state.count} times`])

    return h(
      'button',
      {
        onClick: this.inc,
        class: 'btn btn-primary'
      },
      result
    )
  }
})
