import {
  ActionFunction,
  ActionFunctionArgs,
  json,
  redirect,
} from "react-router-dom";
import AuthForm from "../components/AuthForm";
import jwtDecode from "jwt-decode";

const Authentication = () => {
  return <AuthForm />;
};

export default Authentication;

export type TokenData = {
  email: string;
  exp: number;
  firstName: string;
  type: number;
  sub: string;
  iss: string;
  iat: number;
};

type AuthData = {
  firstName?: FormDataEntryValue | null;
  lastName?: FormDataEntryValue | null;
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const searchParams = new URL(request.url).searchParams;
  const mode = searchParams.get("mode") || "login";
  if (!["login", "signup"].includes(mode)) {
    throw json({ message: "Unsupported mode." }, { status: 422 });
  }
  const data = await request.formData();
  const authData: AuthData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  if (mode === "signup") {
    authData["firstName"] = data.get("firstName");
    authData["lastName"] = data.get("lastName");
  }
  console.log(authData);
  const response = await fetch("http://localhost:8080/user/auth/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if ([422, 401].includes(response.status)) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const resData = await response.json();

  const token = resData.accessToken;
  localStorage.setItem("token", token);
  const tokenData: TokenData = jwtDecode(token);

  const expiration = new Date(tokenData.exp * 1000);

  localStorage.setItem("expiration", expiration.toISOString());
  return redirect("..");
};
