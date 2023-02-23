import { Rental } from "../rental/rental";
import { Role } from "../role/role";

export class Customer {

  constructor(
    public id: number,
    public firstName: string,
    public lastName: string,
    public username: string,
    public password: string,
    public dateOfBirth: string,
    public enabled: boolean,
    public role: Role,
    public rentalMade: number
  ) {}
}
