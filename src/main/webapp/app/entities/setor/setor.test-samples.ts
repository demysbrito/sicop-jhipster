import dayjs from 'dayjs/esm';

import { ISetor, NewSetor } from './setor.model';

export const sampleWithRequiredData: ISetor = {
  id: 18191,
  nome: 'strong emerge',
};

export const sampleWithPartialData: ISetor = {
  id: 19553,
  nome: 'shyly',
  sigla: '../fake-data/blob/hipster.txt',
  updatedAt: dayjs('2024-05-27T19:25'),
  deletedAt: dayjs('2024-05-27T17:57'),
};

export const sampleWithFullData: ISetor = {
  id: 24759,
  nome: 'mmm including',
  sigla: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2024-05-27T23:05'),
  updatedAt: dayjs('2024-05-28T05:58'),
  deletedAt: dayjs('2024-05-27T18:36'),
};

export const sampleWithNewData: NewSetor = {
  nome: 'intently',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
