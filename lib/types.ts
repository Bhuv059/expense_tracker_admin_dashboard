export interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: string;
  createdAt: Date;
}

export interface UserProfile {
  id: string;
  email: string;
  phone: string;
  address: string;
  clerkUserId: string;
}
export interface EditUserParams {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UserEditResult {
  data?: string;
  error?: string;
}

export interface EditUserFormData {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
  path?: string;
}

export interface GetTransactionParams {
  page?: number;
  pageSize?: number;
  searchQuery?: string;
  filter?: string;
  pathName?: string;
}
