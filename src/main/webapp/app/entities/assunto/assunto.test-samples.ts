import dayjs from 'dayjs/esm';

import { IAssunto, NewAssunto } from './assunto.model';

export const sampleWithRequiredData: IAssunto = {
  id: 5480,
  nome: 'unpack relish',
};

export const sampleWithPartialData: IAssunto = {
  id: 5744,
  nome: 'cover',
  createdAt: dayjs('2024-05-28T07:00'),
  updatedAt: dayjs('2024-05-28T12:54'),
};

export const sampleWithFullData: IAssunto = {
  id: 22869,
  nome: 'greenhouse CD',
  descricao: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2024-05-28T06:02'),
  updatedAt: dayjs('2024-05-28T03:30'),
  deletedAt: dayjs('2024-05-28T05:57'),
};

export const sampleWithNewData: NewAssunto = {
  nome: 'over since skill',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
