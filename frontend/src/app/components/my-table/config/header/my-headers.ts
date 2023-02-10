export class MyHeaders {

  constructor(public key: string,
    public label: string) {}

  get name(): string {
    return this.label;
  }
}
