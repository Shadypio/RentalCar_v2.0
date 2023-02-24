import { Rental } from "../rental/rental";

export class Car {



  constructor(
    public id: number,
    public licensePlate: string,
    public brand: string,
    public model: string,
    public year: number,
    public category: string,
    public rental: Rental | null
  ) {}
}
