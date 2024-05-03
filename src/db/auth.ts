import axios from "axios";

export interface SignupInput {
  username: string;
  email: string;
  password: string;
  role: "store_owner" | "admin" | "manager";
}

export async function signup(values: SignupInput) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
      values
    );

    console.log("Response: ", response);

    return response;
  } catch (error) {
    // throw new Error("Error Creating User");
    console.log(error);
  }
}

export async function login() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`);
}
