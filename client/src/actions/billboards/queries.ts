import getUserSession from "../get-user-session";
import { Billboard } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboard = async (
  billboardId: string
): Promise<Billboard | null> => {
  try {
    const session = await getUserSession();

    const res = await fetch(`${URL}/${billboardId}`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return null;
    }

    const billboard: Billboard = await res.json();

    return billboard;
  } catch {
    return null;
  }
};

export const getBillboards = async () => {
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

    const billboards = await res.json();

    return billboards;
  } catch {
    return [];
  }
};
