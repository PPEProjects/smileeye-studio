import { useLangs } from '@composables/useLangs'

export const userColumnsBuilder = () => {
  const { t } = useLangs()

  return [
    {
      title: t('user.name'),
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      width: 250
    },
    {
      title: t('user.email'),
      dataIndex: 'email',
      key: 'email',
      width: 220
    },
    {
      title: t('user.createdAt'),
      dataIndex: 'created_at',
      align: 'center',
      width: 150,
      key: 'createdAt'
    },
    {
      title: t('user.role'),
      dataIndex: 'role',
      align: 'center',
      width: 180,
      key: 'role'
    },
    {
      key: 'action',
      align: 'right',
      fixed: 'right',
      width: 130
    }
  ]
}
