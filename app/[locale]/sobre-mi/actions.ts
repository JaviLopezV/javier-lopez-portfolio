"use server";

import { grantInterviewAccess } from "../../interview-access";

type AccessError = "invalid" | "unavailable" | null;

export async function unlockInterview(
  _state: AccessError,
  formData: FormData,
): Promise<AccessError> {
  const result = await grantInterviewAccess(formData.get("code"));
  return result === "granted" ? null : result;
}
