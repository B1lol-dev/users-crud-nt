export interface IUserData {
  fullName: string;
  email: string;
  phoneNumber: string;
  regId: number;
  password: string;
  gender: "male" | "female";
  _id?: string;
}
