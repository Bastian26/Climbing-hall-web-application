import { Address } from './address';
import {Route} from "./route";

export interface Member {
  id?: number;
  firstName?: string;
  lastName?: string;
  addressDto?: Address;
  favouriteRoutes?: Route[];
}
