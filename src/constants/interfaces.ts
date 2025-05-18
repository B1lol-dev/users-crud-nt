export interface IUserData {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  regId: number;
  password: string;
  gender: "male" | "female";
  updatedAt: string;
}
