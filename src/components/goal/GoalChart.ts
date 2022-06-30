import { computed, defineComponent, h, PropType } from 'vue'

import { Bar } from 'vue-chartjs'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { InfoGoalTemplate_info_goal_template } from '#smileeye/queries/__generated__/InfoGoalTemplate'
import { useI18n } from 'vue-i18n'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

// @ts-ignore
export default defineComponent({
  name: 'GoalChart',
  components: {
    Bar
  },
  props: {
    template: {
      type: Object as PropType<InfoGoalTemplate_info_goal_template>,
      required: true
    }
  },
  setup(props) {
    const { t } = useI18n()

    const labels = computed(() =>
      ['trial', 'in_need', 'on_buy', 'paid_confirmed'].map((key) =>
        t(`payment.status.${key}`)
      )
    )

    const chartResource = computed<number[]>(() => {
      const _temp = props.template.detail_template!
      return [_temp.trial, _temp.in_need, _temp.on_buy, _temp.paid_confirmed]
    })

    const chartData = {
      labels: labels.value,
      datasets: [
        {
          backgroundColor: ['#3b66f5', '#9c27b0', '#f50', '#87d068'],
          data: chartResource.value
        }
      ]
    }

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false
    }

    return () =>
      h(Bar, {
        chartData,
        chartOptions,
        chartId: 'goal-chart'
      })
  }
})
