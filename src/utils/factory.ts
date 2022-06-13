import { faker } from '@faker-js/faker'

export const paymentFactory = () => {
  return {
    billImage: faker.image.image(),
    createdAt: '20/10/2022',
    name: faker.name.jobArea(),
    status: faker.datatype.number({ min: 0, max: 2 })
  }
}
