import dayjs from 'dayjs/esm';

import { ITopico, NewTopico } from './topico.model';

export const sampleWithRequiredData: ITopico = {
  id: 'd01b3909-d905-486a-b0aa-ada727e87a6b',
  titulo: 'tidy',
};

export const sampleWithPartialData: ITopico = {
  id: '30da405b-2b6f-48a9-9d3f-9c7019e87966',
  titulo: 'now',
  conteudo: '../fake-data/blob/hipster.txt',
  createdAt: dayjs('2024-05-28T01:34'),
  updatedAt: dayjs('2024-05-27T22:25'),
  deletedAt: dayjs('2024-05-27T22:30'),
};

export const sampleWithFullData: ITopico = {
  id: 'f4b3a8da-bb48-4ff1-b217-543a25e6b95d',
  titulo: 'mattock underneath',
  conteudo: '../fake-data/blob/hipster.txt',
  ativo: true,
  createdAt: dayjs('2024-05-28T13:07'),
  updatedAt: dayjs('2024-05-27T23:57'),
  deletedAt: dayjs('2024-05-27T19:19'),
};

export const sampleWithNewData: NewTopico = {
  titulo: 'searchingly behind',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
