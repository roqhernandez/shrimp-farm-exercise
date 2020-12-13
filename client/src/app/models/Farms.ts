import { Pond } from './Ponds';
export interface Farm {

  _id?: string;
  name?: string;
  town?: string;
  province?: string;
  manager?: string;
  ponds?: Pond[];
  totalSize?: number;

}
