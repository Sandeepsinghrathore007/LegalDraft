import type { PlanId } from "@/features/pricing/plans";

export type UserState = {
  downloadsUsed: number;
  email: string;
  fullName: string;
  isLoggedIn: boolean;
  plan: PlanId;
};

export type StoredAccount = {
  createdAt: string;
  email: string;
  fullName: string;
  password: string;
};

export type LoginPayload = {
  email: string;
  fullName?: string;
};

export type SignUpPayload = {
  email: string;
  fullName: string;
};
