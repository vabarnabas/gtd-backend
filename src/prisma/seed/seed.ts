import { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import { hash, genSalt } from 'bcrypt';
import { Optional } from 'src/common/types/utility.types';

const prisma = new PrismaClient();

const user: Optional<User, 'id'> = {
  displayName: 'Super Admin',
  email: 'superadmin@roszti.com',
  password: 'aa',
};

const main = async () => {
  if (user.password) {
    const salt = await genSalt();
    user.password = await hash(user.password, salt);
  }

  await prisma.user.create({
    data: {
      ...user,
    },
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
