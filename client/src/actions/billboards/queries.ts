import getUserSession from "../get-user-session";

import { Billboard } from "@/types";

const URI = `${process.env.NEXT_PUBLIC_API_URL}/billboards`;

export const getBillboards = async () => {
  try {
    const session = await getUserSession();

    const res = await fetch(URI, {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      // const error = await res.json();
      // console.log(error);
      return [];
    }

    const billboards = await res.json();

    return billboards;
  } catch {
    return [];
  }
};

export const getBillboard = async ({
  billboardId,
  categoryId,
}: {
  billboardId?: string;
  categoryId?: string;
}): Promise<Billboard | null> => {
  try {
    const session = await getUserSession();

    const url = new URL(`${URI}/billboard`);

    if (billboardId) {
      url.searchParams.append("billboardId", billboardId);
    }
    if (categoryId) {
      url.searchParams.append("categoryId", categoryId);
    }

    const res = await fetch(url.toString(), {
      method: "GET",
      headers: {
        authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      const error = await res.json();
      console.log(error);

      return null;
    }

    const billboard: Billboard = await res.json();

    return billboard;
  } catch {
    return null;
  }
};
