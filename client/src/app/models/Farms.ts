import { Pond } from './Ponds';
export interface Farm {
  //Interface that represent the data model of the App

  _id?: string;
  name?: string;
  town?: string;
  province?: string;
  manager?: string;
  ponds?: Pond[];
  totalSize?: number;

}
