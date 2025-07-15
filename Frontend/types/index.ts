// types/Employee.ts
export interface EmployeeType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  dateOfJoining: string;
  currentCTC: number;
  designation: string;
  department: string;
  status: string;
}

export interface UserData{
  _id: string,
  name: string,
  email: string,
  location: string,
  phone: string,
  summary: string
}
export type DecodedToken = {
  userId: string;
  exp: number;
  iat: number;
};
