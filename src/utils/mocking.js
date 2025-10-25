import { faker } from '@faker-js/faker';
import bcrypt from 'bcrypt';


export const generateUser = () => {
  const hashedPassword = bcrypt.hashSync('coder123', 10);

  return {
    _id: faker.database.mongodbObjectId(),
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: hashedPassword,
    role: faker.helpers.arrayElement(['user', 'admin']),
    pets: [],
  };
};


export const generatePet = () => ({
  _id: faker.database.mongodbObjectId(),
  name: faker.animal.dog(),
  specie: faker.animal.type(),
  birthDate: faker.date.past(),
  adopted: faker.datatype.boolean(),
  owner: null,
});