import { PrismaClient } from '@prisma/client';
// import { genSalt, hash } from 'bcryptjs';

const prisma = new PrismaClient();

// async function seedUsers() {
//   const salt = await genSalt(10);

//   const customer = await prisma.user.upsert({
//     where: { username: 'customer' },
//     update: {},
//     create: {
//       first_name: 'John',
//       last_name: 'Doe',
//       username: 'customer',
//       email: 'customer@test.com',
//       password: await hash('test1234', salt),
//     },
//   });

//   const admin = await prisma.user.upsert({
//     where: { username: 'admin' },
//     update: {},
//     create: {
//       first_name: 'Alec',
//       last_name: 'Foster',
//       username: 'admin',
//       email: 'admin@test.com',
//       role: 'admin',
//       password: await hash('test1234', salt),
//     },
//   });

//   console.log({ customer, admin });
// }

// async function seedCategories() {
//   const firstCategory = await prisma.category.create({
//     data: {
//       name: 'Gift',
//       icon: 'ph:gift-thin',
//     },
//   });

//   console.log({ firstCategory });
// }

async function seedBillboards() {
  const firstBillboard = await prisma.billboard.create({
    data: {
      label: 'Gifts that make a difference',
      image_url:
        'https://res.cloudinary.com/dt8dezfxn/image/upload/v1719318540/cmfl8qljeknjnxqk2yfl.jpg',
      user_id: '2d4c7dc8-bc67-478f-b5c4-7c1a6268ec90',
      category_id: '54d65af3-0236-4222-b7df-d2904a419165',
    },
  });

  console.log({ firstBillboard });
}

// execute the seed function
seedBillboards()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
