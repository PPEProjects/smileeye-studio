## Feature
Trang quản lý thông tin mã giảm giá:
- Thêm mã giảm giá
- Xóa mã giảm giá
- Sửa mã giảm giá
## Technhical
Apollo Client, VueJs, Typescript, Ant design, Mitter
## Access
🛰 Truy cập page tại `https://studio.smileeye.edu.vn/coupon` </br>
⛱ Main component: `src/pages/coupon/index.vue` </br>
## Workflow
🚀 Vòng đời của page được phân tích theo các phần sau:

![Notify Workflow@2x](https://i.imgur.com/vQ3Mqk1.png)

> Trang là 1 phần nhỏ của vue router life cycle và tuân thủ mọi vue router life cycle cũng Vue component.

## Component Tree
📚 Các thành phần của page được phân tích theo các phần sau:
- Component Table: `src/components/coupon/CouponTable.vue`
- Component Upsert: `src/components/coupon/CouponUpsertModal.vue`
- Add Button: `src/pages/coupon/index.vue`
### Table
📚 Component: `src/components/coupon/CouponTable.vue` <br/>
🌈 Hiển thị thông tin của coupon. Phân trang, kích hoạt chỉnh sửa. <br/>
🔥 Dữ liệu được lấy deep cache của apollo.
> Chi tiết thêm về component: `src/components/coupon/CouponTable.vue`
