import dayjs from 'dayjs/esm';

import { IUsuario, NewUsuario } from './usuario.model';

export const sampleWithRequiredData: IUsuario = {
  id: 18063,
  nome: 'ugh properly',
};

export const sampleWithPartialData: IUsuario = {
  id: 30579,
  nome: 'crew mouth',
  login: 'embroil',
  createdAt: dayjs('2024-05-28T05:10'),
  deletedAt: dayjs('2024-05-27T23:05'),
};

export const sampleWithFullData: IUsuario = {
  id: 8413,
  nome: 'smear dreamily upchuck',
  login: 'unto poorly marvel',
  email: 'Isaac.Pereira@yahoo.com',
  cpf: 'nor unfortunate hero',
  createdAt: dayjs('2024-05-28T09:37'),
  updatedAt: dayjs('2024-05-28T04:05'),
  deletedAt: dayjs('2024-05-28T06:57'),
};

export const sampleWithNewData: NewUsuario = {
  nome: 'where',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
