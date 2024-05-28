import dayjs from 'dayjs/esm';

import { IPortaria, NewPortaria } from './portaria.model';

export const sampleWithRequiredData: IPortaria = {
  id: 29004,
  numero: 3975,
};

export const sampleWithPartialData: IPortaria = {
  id: 16305,
  numero: 29416,
  data: dayjs('2024-05-28'),
  ano: 16297,
  justificativaExclusao: 'hm accelerator',
  updatedAt: dayjs('2024-05-28T06:58'),
};

export const sampleWithFullData: IPortaria = {
  id: 16121,
  numero: 23072,
  data: dayjs('2024-05-28'),
  ano: 4270,
  justificativaExclusao: 'amid',
  createdAt: dayjs('2024-05-28T10:26'),
  updatedAt: dayjs('2024-05-28T05:06'),
  deletedAt: dayjs('2024-05-27T21:43'),
};

export const sampleWithNewData: NewPortaria = {
  numero: 1038,
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
