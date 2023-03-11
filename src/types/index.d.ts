import { Role } from '@prisma/client';

declare global {
  namespace Express {
    interface User {
      id: string;
      subject: string;
      name: string | null;
      nickName: string | null;
      email: string;
      birthDate: Date | null;
      roleId: string;
      createdAt: Date;
      updatedAt: Date;
      deletedAt: Date | null;
      Role: Role;
    }
  }
}
