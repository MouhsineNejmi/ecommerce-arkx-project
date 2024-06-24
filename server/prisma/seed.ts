import { PrismaClient } from '@prisma/client';
import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const salt = await genSalt(10);

  const customer = await prisma.user.upsert({
    where: { username: 'customer' },
    update: {},
    create: {
      first_name: 'John',
      last_name: 'Doe',
      username: 'customer',
      email: 'customer@test.com',
      password: await hash('test1234', salt),
    },
  });

  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      first_name: 'Alec',
      last_name: 'Foster',
      username: 'admin',
      email: 'admin@test.com',
      role: 'admin',
      password: await hash('test1234', salt),
    },
  });

  console.log({ customer, admin });
}

// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
