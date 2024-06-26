import getUserSession from "../get-user-session";

import { Color } from "@/types";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/colors`;

export const getColors = async (): Promise<Color[]> => {
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

    const colors = await res.json();

    return colors;
  } catch {
    return [];
  }
};

export const getColor = async (colorId: string): Promise<Color | null> => {
  try {
    const session = await getUserSession();

    const res = await fetch(`${URL}/${colorId}`, {
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

    const color = await res.json();

    return color;
  } catch {
    return null;
  }
};
