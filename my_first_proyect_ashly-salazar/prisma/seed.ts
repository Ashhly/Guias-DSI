import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const tenant = await prisma.tenant.create({
    data: {
      name: 'Empresa Demo',
    },
  });

  const user = await prisma.user.create({
    data: {
      email: 'admin@demo.com',
      name: 'Admin Demo',
      password: 'password123',
      role: 'ADMIN',
      tenantId: tenant.id,
    },
  });

  console.log({ tenant, user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });