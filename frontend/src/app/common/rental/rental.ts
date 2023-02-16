import { Car } from "../car/car";
import { Customer } from "../customer/customer";

export class Rental {

  constructor(
    public id: number,
    public startDate: string,
    public endDate: string,
    public referredCustomer: Customer,
    public rentedCar: Car

  ) {}
}
