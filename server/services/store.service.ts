import { CreateStoreInput } from "../dto/store.dto";
import prisma from "../utils/prisma";

export const createStore = async (store: CreateStoreInput) => {
  return await prisma.store.create({
    data: store,
  });
};
