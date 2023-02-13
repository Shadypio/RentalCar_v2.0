export class Car {

  [colName: string]: number | string;

  constructor(
    public id: number,
    public licensePlate: string,
    public brand: string,
    public model: string,
    public year: number,
    public category: string
  ) {}
}
