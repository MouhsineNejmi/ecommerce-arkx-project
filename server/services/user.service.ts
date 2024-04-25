import { SearchQuery } from "../dto/queries.dto";
import {
  CreateUserInput,
  FindUserOptions,
  UpdateUserInput,
} from "../dto/user.dto";
import prisma from "../utils/prisma";

export const existingUser = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user ? true : false;
  } catch (error) {
    console.log("EXISTING_USER", error);
  }
};

export const createUser = async (data: CreateUserInput) => {
  const user = await prisma.user.create({ data });

  return user;
};

export const findUserById = async (id: string) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};

export const findAllUsers = async (query: SearchQuery) => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: query.sort,
    },
    skip: (query.page - 1) * query.resultsPerPage,
    take: query.page * query.resultsPerPage,
  });
};

export const findUser = async (
  options: FindUserOptions,
  query?: SearchQuery
) => {
  return await prisma.user.findMany({
    where: {
      username: options.username
        ? {
            contains: options.username,
            mode: "insensitive",
          }
        : undefined,
    },
    orderBy: {
      createdAt: query?.sort,
    },
  });
};

export const findUserByIdAndUpdate = async (
  id: string,
  updatedFields: UpdateUserInput
) => {
  return await prisma.user.update({
    where: { id },
    data: updatedFields,
  });
};

export const findUserByIdAndDelete = async (id: string) => {
  return await prisma.user.delete({
    where: { id },
  });
};
