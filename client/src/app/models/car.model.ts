import { Roles, User } from "./user.model";

export type OptionalType = { name: string; options?: string[]; image?: string };

export enum EnginePowerSupplyEnum {
  Diesel,
  Gasoline,
  Methane,
  GPL,
  Electric,
}

export interface IDimension {
  height: number;
  length: number;
  width: number;
  weight: number;
  trunkVolume: number;
}

export interface ICar {
  model: string,
  description: string,
  dimensions: IDimension,
  engine_type: EnginePowerSupplyEnum,
  engine_power: number,
  optionals: OptionalType[],
  imageUrl?: string,
  discount?: number
}

export class Car implements ICar{
  constructor(
    public model: string,
    public description: string,
    public dimensions: IDimension,
    public engine_type: EnginePowerSupplyEnum,
    public engine_power: number,
    public optionals: OptionalType[],
    public imageUrl?: string,
    public readonly discount?: number
  ) {}
}

export class UsedCar extends Car {
  constructor(
    car: Car
  ) {
    super(
      car.model,
      car.description,
      car.dimensions,
      car.engine_type,
      car.engine_power,
      car.optionals
    );
  }

  isValid(): boolean {
    const errs = [];

    if (!this.model) errs.push('[model] So, can I buy an empty model car?');
    if (this.dimensions.height <= 0) errs.push('[height] It needs to grow');
    if (this.dimensions.length <= 0) errs.push('[length] Is it going to light speed?');
    if (this.dimensions.width <= 0) errs.push('[width] Harry Potter night bus?');
    if (this.dimensions.weight <= 0) errs.push('[weight] Negative weight does not exists');
    if (this.dimensions.trunkVolume <= 0) errs.push('[trunkVolume] Is it a antimatter trunk?');
    if (this.engine_power <= 0) errs.push('[enginPower] Engine power is negative. Is it a bycicle?');

    if(errs.length > 0) throw new Error(errs.join('\n'));
    return true
    
  }
}

export class Evaluation extends UsedCar {

  private _confirmed: boolean
  
  constructor(
    car: Car,
    public value: number,
    public id: string,
    confirmed: boolean,
    discount: number = 0
  ) {
    super(car);
    this._confirmed = confirmed
  }

  get confirmed() {
    return this._confirmed
  }
  
  confirm(user: User) {
    if(user.roles.includes(Roles.SEGRETERIA)) this._confirmed = true
  }


}
