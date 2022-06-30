import ExcelJS from 'exceljs'
import type { Worksheet } from 'exceljs'

export type IExcelColumn = {
  label: string
  value: string | any[]
  width?: number
}

interface MappingColumes {
  header: string
  key: string
  width: number
  props: string[]
}

const mappingColumns = (columns: IExcelColumn[], targer: string[]) => {
  return columns
    .filter((col) => targer.includes(col.label))
    .map((column) => {
      const props =
        column.value instanceof Array ? column.value : [column.value]

      return <MappingColumes>{
        header: column.label,
        key: props.join('.'),
        width: column.width || 100,
        props
      }
    })
}

const buildColumeItem = (data: any, props: string[]): any => {
  if (props.length === 1) {
    return data?.[props[0]]
  }
  return buildColumeItem(data?.[props[0]], props?.slice(1))
}

const mappingRow = (columns: MappingColumes[], data: any) => {
  const _row: {
    [key: string]: any
  } = {}

  columns.forEach((column) => {
    _row[column.key] = buildColumeItem(data, column.props)
  })
  return _row
}

export const builDeepExcel = async (
  columns: IExcelColumn[],
  targer: string[],
  data: any[]
) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet: Worksheet = workbook.addWorksheet('Sheet 1')

  const columnsMapping = mappingColumns(columns, targer)

  console.log('columnsMapping', columnsMapping)
  console.log('Data', data)

  worksheet.columns = columnsMapping.map((colum) => ({
    header: colum.header,
    key: colum.key,
    width: colum.width
  }))

  worksheet.addRows(data.map((row) => mappingRow(columnsMapping, row)))

  // DeepData

  const fileData = await workbook.xlsx.writeBuffer()

  return new Blob([fileData], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  })
}
