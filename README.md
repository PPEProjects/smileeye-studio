
# Smileeye Studio

Trang quản lý thông tin, thiết lập, quản lý các ứng dụng của Smileeye.
## Công nghệ sử dụng
Apollo Client, VueJs, Typescript, Firebase

## Truy cập Studio

🛰 Truy cập studio tại `https://studio.smileeye.edu.vn`</br>
📇 Nếu không thể truy cập thông qua mạng LAN của `Yuan` tại PPE.</br>
🔑 Để có quyền truy cập vào các khu vực nâng cao của studio hãy indox [Yuan](mailto:nguyenshort@gmail.com)

## Vòng đời của Studio
🚀 Vòng đời của studio được phân tích theo các phần sau: 

![Notify Workflow@2x](https://i.imgur.com/0SywboA.png)

> Ứng dụng tuân thủ mọi life cycle của một Vue Application tiêu chuẩn.

## Global State
Ứng dụng chỉ có một Global State duy nhất `User Instance`. Là store được tạo từ [Pinia](https://pinia.vuejs.org/) </br>
Để xem structure của store xem file `store/user.ts`.<br/>
> Bạn có thể sử dụng nó bằng cách `inject` vào các component của bạn. Xem chi tiết tại [Pinia](https://pinia.vuejs.org/).

## Apollo Client

Chúng tôi sử dụng graphql thay thế cho restful. Hiện ứng dụng sử 2 client khác nhau.
- [Smileeye](https://v2-be.smileeye.edu.vn/graphql): Nguồn chính của dữ liệu
- [Notify](https://notify.foodmix.xyz/graphql): Server phụ trợ. <br />
## Lưu Ý
- Vì đây là ứng dụng Vue nên khi sử dụng apollo composable/apollo hooks, bạn cần `import { /* Any Hook */ } from '@vue/apollo-composable'`.
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
> Để tạo kiểu tự động cho query, mutation, subscription. Bạn chỉ cần viết query của mình vào bất kì vị trí nào trong `src/apollo/smileeye/(mutations|queries|subscriptions)` và plugin sẽ tự động tạo kiểu cho nó. </br>
- Ví dụ: `src/apollo/smileeye/queries/user.ts`
> Bạn cần cài đặt Apollo, Graphql dưới dạng global để sử dụng tính năng này. Hiện chỉ support cho smileeye. Bạn có thể dễ dang mở rộng nó tại: `src/plugins/vite.ts`

## Tác giả
- Là sản phẩm thuộc về PPE
- Phát tiển [Yuan](https://github.com/dnstylish)
- Bug: [dnstylish@gmail.com](mailto:dnstylish@gmail.com)
- Giấy phép: MIT

