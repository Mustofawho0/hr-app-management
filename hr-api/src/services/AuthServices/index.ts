import { IFindEmployeeByEmailParams } from './type';
import { prisma } from '../../connection';

export const findEmployeeByEmail = async ({
  email,
}: IFindEmployeeByEmailParams) => {
  const findEmployee = await prisma.employees.findFirst({
    where: {
      email,
    },
  });

  if (!findEmployee) throw new Error('User Not Found!');

  return findEmployee;
};
export const findEmployeeByUid = async ({ uid }: { uid: string }) => {
  return await prisma.employees.findUnique({
    where: {
      uid,
    },
    include: {
      position: true,
    },
  });
};