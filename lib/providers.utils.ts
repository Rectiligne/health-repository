import { AccessToken } from "../types/accessToken.type";

export const getAccessToken = async (uri: string): Promise<AccessToken> => {
  const res = await fetch(uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  return await res.json();
};
