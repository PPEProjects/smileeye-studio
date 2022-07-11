
# Smileeye Studio
Trang quản lý thông tin, thiết lập, quản lý các ứng dụng của Smileeye.
> Tôi giả định rằng người đọc tài liệu này đã có sẵn kiến thức về Vue 3 hoặc tối thiểu là kĩ thuật lập trình. Nếu chưa bạn hay tham khảo tài liệu của [Vue](https://vuejs.org/guide/introduction.html). Tài liệu này sẽ giúp bạn có thể đọc hiểu một số phần sau của tài liệu.

> Các tài liệu liên quan khác:
* [Axios](https://www.npmjs.com/package/axios): Hỗ trợ các phương thức HTTP
* [Apollo](https://www.npmjs.com/package/apollo-client): Hỗ trợ các phương thức GraphQL
* [Pinia](https://www.npmjs.com/package/pinia): State management for Vue.js
* [Vue Router](https://router.vuejs.org/): Hỗ trợ các phương thức điều hướng
## Công nghệ sử dụng
Apollo Client, VueJs, Typescript, Firebase

## Truy cập Studio

🛰 Truy cập studio tại `https://studio.smileeye.edu.vn`</br>
📇 Nếu không thể truy cập thông qua mạng LAN của `Yuan` tại PPE.</br>
🔑 Để có quyền truy cập vào các khu vực nâng cao của studio hãy indox [Yuan](mailto:nguyenshort@gmail.com)

## Vòng đời của Studio
🚀 Vòng đời của studio được phân tích theo các phần sau: 

![Notify Workflow@2x](https://i.imgur.com/0SywboA.png)

> Ứng dụng và 1 phần nhỏ của vue life cycle và tuân thủ mọi life cycle của một Vue Application tiêu chuẩn.

## Global State
Ứng dụng chỉ có một Global State duy nhất `User Instance`. Là store được tạo từ [Pinia](https://pinia.vuejs.org/) </br>
Để xem structure của store xem file `store/user.ts`.<br/>
> Bạn có thể sử dụng nó bằng cách `inject` vào các component của bạn. Xem chi tiết tại [Pinia](https://pinia.vuejs.org/).

## Apollo Client

Chúng tôi sử dụng graphql thay thế cho restful. Hiện ứng dụng sử 2 client khác nhau.
- [Smileeye](https://v2-be.smileeye.edu.vn/graphql): Nguồn chính của dữ liệu
- [Notify](https://notify.foodmix.xyz/graphql): Server phụ trợ. <br />
## Lưu Ý
- Vì đây là ứng dụng Vue nên khi sử dụng apollo hooks, bạn cần `import { /* Any Hook */ } from '@vue/apollo-composable'`.
- [Vue Apollo V4](https://v4.apollo.vuejs.org/)
- Mặc định hooks và option sẽ sử dụng smileeye là client mặc định.
### Smileeye

```ts
import {useSmileeye} from "#apollo/client/smileeye"
// Apollo Instance
useSmileeye()
```
### Notify
```ts
import {useSmileeye} from "#apollo/client/smileeye"
// Apollo Instance
useSmileeye()

import { useQuery } from '@vue/apollo-composable'

// For hook usage
import { ApolloEnum } from '@plugins/apollo'
const { result } = useSubscription<T, T2>(
    QUERY,
    vars,
    {
        clientId: ApolloEnum.notify
    }
)

```

### Deep Cache
- Thay vì dùng state management chúng tôi sử dụng deep cache của Apollo client để lưu trữ dữ liệu. </br>
- Khi sử dụng nó template sẽ tự động update khi bất kì instance nào thay đổi.
> Vì thuộc tính của deep cache là read-only cho nên nếu bạn muốn thay đổi dữ liệu thì bạn phải deep copy nó trước khi sử dụng.
```ts
structuredClone(cache)
Object.assign({}, cache)
JSON.parse(JSON.stringify(cache))
// or any other way to deep copy
```

### Apollo Type Generator
- Bạn có thể thấy chúng tôi sử dụng typescript cho ứng dụng. Để tăng hiệu suất, chúng tôi sử dụng generic type cho các hook. Ví dụ như: `useSubscription<SubToast, SubToastVariables>`. </br>
- Điều này kiến cho code trở nên tường minh hơn. Và gặp ít bug hơn.
> Để tạo kiểu tự động cho query, mutation, subscription. Bạn chỉ cần viết query của mình vào bất kì vị trí nào trong `src/apollo/smileeye/(mutations|queries|subscriptions)` và plugin nhỏ của tôi sẽ tự động tạo kiểu cho nó. </br>
- Ví dụ: `src/apollo/smileeye/queries/user.ts`
> Bạn cần cài đặt Apollo, Graphql dưới dạng global để sử dụng tính năng này. Hiện chỉ support cho smileeye. Bạn có thể dễ dàng mở rộng nó tại: `src/plugins/vite.ts`
## Layout
- Chúng tôi sử dụng dynamic layout cho mỗi router. Mới mỗi router bạn có thể setup layout riêng cho nó. Xem ví dụ tại: `src/routes.ts`. Nếu bỏ trống nó sẽ tự nhận layout mặc định là `default`. </br>
- Để can thiệp vào layout, bạn cần sử dụng `<MasterView />` component. Xem ví dụ tại: `src/components/layout/MasterView.vue`.
## Icon
- Hiện chúng tôi sử dụng icon bằng `SVG Sprites`.
- Ví dụ: `src/components/layout/IconView.vue`
- Hướng dẫn chi tiết: [Sitepoint](https://www.sitepoint.com/use-svg-image-sprites/).
```
<svg class="icon">
    <use xlink:href="${icon}"></use>
</svg>
```
## Global Event
Global event là gì?
> Khi component tree phức tạp, việc giao tiếp giữa các component sẽ rất khó khăn. Vì vậy, chúng tôi sử dụng global event để giao tiếp giữa các component.
<!-- end of the list -->
Tính năng này trên Vue 2 gọi là eventBus nhưng nó đã được gỡ bỏ trên Vue 3. Để khắc phục vấn đề này tôi đã tạo 1 thư viện nhỏ để sử dụng: `@nguyenshort/vue3-mitt`.</br>
Chi tiết và hướng dẫn xem tại: [NPM](https://www.npmjs.com/package/@nguyenshort/vue3-mitt).

## Complex Component
Mỗi component đều có những nhiệm vụ khác nhau. Tôi giả định rằng người đọc đã có kiến thức về Vue, Apollo...đã được yêu cầu ở mục đầu tiên.
> Sau đây tôi sẽ giải thích một component tiêu chuẩn của ứng dụng như sau:
```ts
// src/components/coupon/CouponTable.vue
```
Component này sẽ dùng để hiển thị thông tin về coupon.
- `<script lang="ts" setup>`: Đây là đoạn code để khai báo component sử dụng ts và scrip setup.
- `imports...`: Import các thư viện cần thiết.
- `Inject` các provider cần thiết:
```ts
// Đa ngôn ngữ
const { t } = useI18n()
// Định dạng thời gian
const dayjs = useDayjs()
```
- `const columns=[]`: Khai báo các cột của bảng.
- Định nghĩa query variables: Việc gán các variables bằng reactive sẽ giúp query có thể `react` => `smart query`.
```ts
const queryVariable = reactive({
  first: 7,
  page: 0,
  expiry: FilterExpiry.all
})
```
- Khởi tạo query. Như tôi đã nói vì chúng ta đã khai báo query variables là một reactive object, nên query sẽ tự lấy dữ liệu mới mỗi khi có thay đổi.
```ts
const { result, loading } = useQuery<SortCoupons, SortCouponsVariables>(
  SORT_COUPONS,
  queryVariable
)
```
- `coupons` và `counter` là 2 biến readonly được tranform tự động từ kết quả của query trên.
```ts
const coupons = computed<SortCoupons_sort_coupons_data[]>(
  () =>
    (result.value?.sort_coupons?.data || []) as SortCoupons_sort_coupons_data[]
)
const counter = computed<number>(
  () => result.value?.sort_coupons?.info?.total || 0
)
```
- `Mutation` xoá coupon. Khi xoá 1 instance nào đó chúng ta chỉ cần remove cache của instance đó => `deep cache` => `query` => `dom`.
```ts
const { loading: isDeleting, mutate: deleteCouponAction } = useMutation<
  DeleteCoupon,
  DeleteCouponVariables
>(DELETE_COUPON, {
  update: (proxy, _, options) => {
    proxy.evict({
      id: proxy.identify({
        __typename: 'Coupon',
        id: options?.variables?.input?.id
      })
    })
  }
})
```
- Thay đổi phân trang: `queryVariable` change => `query`
```ts
const changePage = ($event: any) => {
  queryVariable.page = $event.current
}
```
- Khao báo các sự kiện toàn cầu:
```ts
// Global event
const emitter = useEmitter<{
  upsertCoupon: SortCoupons_sort_coupons_data | object
  afterUpsertCoupon: SortCoupons_sort_coupons_data
}>()
```
- Lắng nghe sự kiện `afterUpsertCoupon`:</br>
Trích xuất smileeyeClient => thay đổi `deep cache` => `query` => `dom`.
```ts
const smileeye = useSmileeye()
onMounted(() => {
    emitter.on('afterUpsertCoupon', (coupon) => {
        const _index = coupons.value.findIndex((item) => item.id === coupon.id)
        if (_index > -1) {
            // Đã tồn tại. Deep cache cập nhật
            return
        }
        smileeye.cache.writeQuery<SortCoupons, SortCouponsVariables>({
            query: SORT_COUPONS,
            variables: queryVariable,
            data: {
                sort_coupons: {
                    __typename: 'SortCoupon',
                    info: Object.assign({}, result.value?.sort_coupons?.info, {
                        total: counter.value + 1
                    }),
                    data: [coupon, ...coupons.value]
                }
            }
        })
    })
})
```
- Gỡ bỏ sự kiện để tránh memory leak.
```ts
onUnmounted(() => {
  emitter.off('afterUpsertCoupon')
})
```

## Tác giả
- Là sản phẩm thuộc về PPE
- Phát tiển [Yuan](https://github.com/nguyenshort)
- Bug: [nguyenshort@gmail.com](mailto:nguyenshort@gmail.com)
- Giấy phép: MIT

