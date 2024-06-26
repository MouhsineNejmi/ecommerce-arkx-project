import getUserSession from "../get-user-session";

import { Size } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/sizes`;

export const getSizes = async (): Promise<Size[]> => {
  try {
    const session = await getUserSession();

    const res = await fetch(URL, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return [];
    }

    const sizes = await res.json();

    return sizes;
  } catch {
    return [];
  }
};

export const getSize = async (sizeId: string): Promise<Size | null> => {
  try {
    const session = await getUserSession();

    const res = await fetch(`${URL}/${sizeId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const { message } = await res.json();
      console.log(message);

      return null;
    }

    const size = await res.json();

    return size;
  } catch {
    return null;
  }
};
