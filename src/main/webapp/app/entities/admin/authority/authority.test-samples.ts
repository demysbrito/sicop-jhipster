import { IAuthority, NewAuthority } from './authority.model';

export const sampleWithRequiredData: IAuthority = {
  name: '57b2d468-ee69-4dba-aa5c-4edd2789dc0b',
};

export const sampleWithPartialData: IAuthority = {
  name: 'e1a972c2-9941-496a-8da6-c252057f8751',
};

export const sampleWithFullData: IAuthority = {
  name: 'd89ba0e8-4f6c-4e9a-b45b-00da2007e74b',
};

export const sampleWithNewData: NewAuthority = {
  name: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
