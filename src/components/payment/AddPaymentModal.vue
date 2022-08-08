<template>
  <modal-base
      event="addPaymentModal"
      title="Thêm mới hoá đơn"
      :max-width="1000"
  >
    <a-form
        :model="form"
        name="basic"
        autocomplete="off"
        layout="vertical"
        class="-mb-4"
    >
      <div class="flex">
        <div class="w-2/5 flex-shrink-0">

          <a-spin :spinning="loading">
            <a-form-item label="Tìm thành viên theo">
              <a-select v-model:value="searchForm.field">
                <a-select-option value="email">
                  Email
                </a-select-option>
                <a-select-option value="phoneNumber">
                  Số Điện Thoại
                </a-select-option>
              </a-select>
            </a-form-item>

            <a-form-item label="Tìm thành viên">
              <a-input
                  v-model:value="searchForm.keyword"
                  placeholder="Từ khoá..."
              />
            </a-form-item>

            <a-form-item
                label="Thành Viên"
                name="add_user_id"
                :rules="[
                    {
                      required: true,
                      message: 'Vui lòng chọn thành viên'
                    }
                  ]"
                >
              <a-select v-model:value="form.add_user_id">
                <a-select-option
                    v-for="user in users"
                    :key="user.id"
                    :value="user.id"
                >
                  {{ user.name }}
                </a-select-option>
              </a-select>
            </a-form-item>

          </a-spin>


          <a-divider />

          <a-form-item
              label="Trạng Thái"
              name="status"
              :rules="[
              {
                required: true,
                message: 'Vui lòng chọn khoá học'
              }
            ]"
          >
            <a-select
                v-model:value="form.goal_id"
                placeholder="Tên goal"
            >
              <a-select-option
                  v-for="(goal, index) in goals"
                  :key="index"
                  :value="goal.id"
              >
                {{ goal.name }}
              </a-select-option>
            </a-select>
          </a-form-item>


        </div>

        <div class="w-3/5 flex-shrink-0 pl-8">

          <a-form-item label="Mã Giám Giá" name="code_sale">
            <a-input v-model:value="form.code_sale" />
          </a-form-item>


          <a-form-item
              label="Trạng Thái"
              name="status"
              :rules="[
              {
                required: true,
                message: 'Vui lòng chọn trạng thái'
              }
            ]"
          >
            <a-select
                v-model:value="form.status"
                placeholder="Trạng thái hoá đơn"
            >
              <a-select-option :value="STATUS.TRIAL">
                {{ t('payment.status.trial') }}
              </a-select-option>

              <a-select-option :value="STATUS.PAID_CONFIRMED">
                {{ t('payment.status.paid_confirmed') }}
              </a-select-option>

              <a-select-option :value="STATUS.ON_BUY">
                {{ t('payment.status.on_buy') }}
              </a-select-option>
            </a-select>
          </a-form-item>


        </div>
      </div>

      <a-form-item>
        <div class="flex justify-end">
          <a-button
              type="primary"
              html-type="submit"
              class="ml-4"
          >
            Thêm Mới
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </modal-base>
</template>

<script lang="ts" setup>
import ModalBase from "../modal/ModalBase.vue"
import {computed, reactive, ref, watch} from "vue";
import {STATUS} from "#schema/smileeyeTypes";
import {useQuery} from "@vue/apollo-composable";
import {
  SearchUsersByGoal,
  SearchUsersByGoal_list_user_data,
  SearchUsersByGoalVariables
} from "#smileeye/queries/__generated__/SearchUsersByGoal";
import {SEARCH_USERS_BY_GOAL} from "#smileeye/queries/user.query";
import {LIST_GOAL_ROOT} from "#smileeye/queries/goal.query";
import {ListGoalRoot} from "#smileeye/queries/__generated__/ListGoalRoot";
import {useI18n} from "vue-i18n";

type State = {
  add_user_id?: string,
  goal_id: string,
  status: STATUS,
  type: string,
  money: number,
  note: string,
  attachments: string[],
  user_info: {
    name: string,
    email: string,
    phone_number: string
  },
  code_sale: string
}

const { t } = useI18n()

const form = reactive<State>({
  add_user_id: '',
  goal_id: '',
  status: STATUS.PAID_CONFIRMED,
  type: '',
  money: 0,
  note: '',
  attachments: [],
  user_info: {
    name: '',
    email: '',
    phone_number: ''
  },
  code_sale: ''
})
const searchForm = reactive({
  keyword: '',
  field: 'email'
})

const searchQuery = computed(() => ({
  first: 10,
  page: 1,
  [searchForm.field]: `%${searchForm.keyword}%`
}))

const { result, loading } = useQuery<
    SearchUsersByGoal,
    SearchUsersByGoalVariables
    >(SEARCH_USERS_BY_GOAL, searchQuery, {
  debounce: 300
})
const users = ref<SearchUsersByGoal_list_user_data[]>([])
watch(result, (newValue) => {
  form.add_user_id = ''
  users.value =
      (newValue?.list_user?.data as SearchUsersByGoal_list_user_data[]) ||
      ([] as SearchUsersByGoal_list_user_data[])
})

const { result: goalResult } = useQuery<ListGoalRoot>(LIST_GOAL_ROOT)

const goals = computed(() => goalResult?.value?.list_goal_root || [])

</script>

<style scoped>

</style>
