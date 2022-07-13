## Feature
Trang quản lý thông tin thành viên:
- Phân nhóm thành viên
- Tìm kiếm thành viên
- Chỉnh sửa thông tin thành viên. Cắt hình ảnh
## Technhical
Apollo Client, VueJs, Typescript, Ant design, Mitter
## Access
🛰 Truy cập page tại `https://studio.smileeye.edu.vn/users` </br>
⛱ Main component: `src/pages/users/index.vue` </br>
## Workflow
🚀 Vòng đời của page được phân tích theo các phần sau:

![Notify Workflow@2x](https://i.imgur.com/6Dek3Dm.png)

> Trang là 1 phần nhỏ của vue router life cycle và tuân thủ mọi vue router life cycle cũng Vue component.

## Component Tree
📚 Các thành phần của page được phân tích theo các phần sau:
- Table: `@components/users/UsersTable.vue`
- Update: `@components/users/UpdateUserModal.vue`
- Update Role: `@components/users/EditRuleModal.vue`

> Xem chi tiết tại mỗi component.
