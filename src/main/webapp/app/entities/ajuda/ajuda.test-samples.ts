import dayjs from 'dayjs/esm';

import { IAjuda, NewAjuda } from './ajuda.model';

export const sampleWithRequiredData: IAjuda = {
  id: '9d34deec-a2c4-4975-9b74-e95b91cb0b64',
  titulo: 'mixed disperse subsist',
};

export const sampleWithPartialData: IAjuda = {
  id: 'ec036a15-3820-4b4c-bfb9-9bf6a3e10ed8',
  titulo: 'hopelessly',
  ativo: false,
  createdAt: dayjs('2024-05-28T16:33'),
  updatedAt: dayjs('2024-05-27T21:18'),
  deletedAt: dayjs('2024-05-28T10:10'),
};

export const sampleWithFullData: IAjuda = {
  id: '6b280555-53f5-4ba5-809a-6abcfc674819',
  titulo: 'but',
  conteudo: '../fake-data/blob/hipster.txt',
  ativo: true,
  createdAt: dayjs('2024-05-27T20:27'),
  updatedAt: dayjs('2024-05-28T02:34'),
  deletedAt: dayjs('2024-05-28T00:59'),
};

export const sampleWithNewData: NewAjuda = {
  titulo: 'half-brother certainly',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
