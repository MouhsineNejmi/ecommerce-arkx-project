import { Billboard } from "@/types";
import { BillboardFormInput, billboardSchema } from "@/schemas/billboard";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

type CreateBillboardResponse = Billboard | string;

export const createBillboard = async (
  values: BillboardFormInput,
  token: string
): Promise<CreateBillboardResponse> => {
  const validateFields = billboardSchema.safeParse(values);

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

  console.log(res);

  if (!res.ok) {
    const { message } = await res.json();
    return message;
  }

  const billboard = await res.json();

  return billboard;
};

export const editBillboard = async (
  billboardId: string,
  values: BillboardFormInput,
  token: string
): Promise<Billboard | null> => {
  const res = await fetch(`${URL}/${billboardId}`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...values }),
  });

  if (!res.ok) {
    return null;
  }

  const billboard = await res.json();

  return billboard;
};

export const deleteBillboard = async (
  billboardId: string,
  token: string
): Promise<Billboard | null> => {
  const res = await fetch(`${URL}/${billboardId}`, {
    method: "DELETE",
    headers: {
      authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    return null;
  }

  const billboard = await res.json();
  return billboard;
};
