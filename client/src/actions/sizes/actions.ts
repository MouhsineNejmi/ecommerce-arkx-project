import { Size } from "@/types";
import { SizeFormInput, sizeSchema } from "@/schemas/size";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

type CreateSizeResponse = Size | string;

export const createSize = async (
  values: SizeFormInput,
  token: string
): Promise<CreateSizeResponse> => {
  const validateFields = sizeSchema.safeParse(values);

  if (!validateFields.success) {
    return "Invalid Fields!";
  }

  const res = await fetch(`${URL}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const size = await res.json();

  return size;
};

export const editSize = async (
  sizeId: string,
  values: SizeFormInput,
  token: string
): Promise<Size | null> => {
  const res = await fetch(`${URL}/${sizeId}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const size = await res.json();

  return size;
};

export const deleteSize = async (
  sizeId: string,
  token: string
): Promise<Size | null> => {
  const res = await fetch(`${URL}/${sizeId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const size = await res.json();
  return size;
};
