## Feature
Trang thông tin thành viên:
- Xem thông tin thành viên
- Sửa thông tin thành viên
- Xem danh sách goal
- xem danh sách bài post
- Xem lộ trình học tập
## Technhical
Apollo Client, VueJs, Typescript, Ant design, Mitter
## Access
🛰 Truy cập page tại `https://studio.smileeye.edu.vn/users/*` </br>
⛱ Main component: `src/pages/users/id/index.vue` </br>
## Workflow
🚀 Vòng đời của page được phân tích theo các phần sau:

![Notify Workflow@2x](https://i.imgur.com/HBS2ZV8.png)

> Trang là 1 phần nhỏ của vue router life cycle và tuân thủ mọi vue router life cycle cũng Vue component.

> Xem chi tiết tại mỗi component.

## Dynamic Post Layout
Danh sách post được tranform thành layout động và sẽ thay đổi khi kích thước thay đổi.
<br/>🔥 Vấn đề hiện tại: Không thể keep state của iframe.
## Goal tree
📝 Goal tree là một cây của goal. Được render bằng `Vue Draggable`.
