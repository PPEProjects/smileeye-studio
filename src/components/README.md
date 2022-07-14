## Export File
Xuất file động, không giới hạn số lượng, và độ phức tạp của object.

> `src/components/includes/ButtonBase.vue`
<!-- end -->

![Notify Workflow@2x](https://i.imgur.com/ZhR1m76.png)

### ExcelColumn
Cấu trúc của ExcelColumn
```ts
export type IExcelColumn = {
  label: string
  value: string | any[]
  width?: number
}
```
`value` là đường dẫn tới value của cell. Vd nếu `book.user.name` thì `value` là `['book', 'user', 'name']`.

>`Export` sẽ dùng đệ quy để xuất file.
