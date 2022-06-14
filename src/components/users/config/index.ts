import { useLangs } from '@composables/useLangs'

export const userColumnsBuilder = () => {
  const { t } = useLangs()

  return [
    {
      title: t('users.table.name'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 250
    },
    {
      title: t('users.table.email'),
      dataIndex: 'email',
      key: 'email',
      width: 220
    },
    {
      title: t('users.table.createdAt'),
      dataIndex: 'created_at',
      align: 'center',
      width: 150,
      key: 'createdAt'
    },
    {
      title: t('users.table.role'),
      dataIndex: 'role',
      align: 'center',
      width: 180,
      key: 'role'
    },
    {
      title: t('payment.table.action'),
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 130
    }
  ]
}
