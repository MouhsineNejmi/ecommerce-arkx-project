import { Color } from "@/types";
import { ColorFormInput, colorSchema } from "@/schemas/color";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

type CreateColorResponse = Color | string;

export const createColor = async (
  values: ColorFormInput,
  token: string
): Promise<CreateColorResponse> => {
  const validateFields = colorSchema.safeParse(values);

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

  const color = await res.json();

  return color;
};

export const editColor = async (
  colorId: string,
  values: ColorFormInput,
  token: string
): Promise<Color | null> => {
  const res = await fetch(`${URL}/${colorId}`, {
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

  const color = await res.json();

  return color;
};

export const deleteColor = async (
  colorId: string,
  token: string
): Promise<Color | null> => {
  const res = await fetch(`${URL}/${colorId}`, {
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

  const color = await res.json();
  return color;
};
