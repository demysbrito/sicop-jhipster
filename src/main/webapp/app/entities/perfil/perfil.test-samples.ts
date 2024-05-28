import { IPerfil, NewPerfil } from './perfil.model';

export const sampleWithRequiredData: IPerfil = {
  id: 4413,
  nome: 'brr',
};

export const sampleWithPartialData: IPerfil = {
  id: 7527,
  nome: 'tram',
};

export const sampleWithFullData: IPerfil = {
  id: 14556,
  nome: 'volley',
  descricao: 'furthermore overwrite',
};

export const sampleWithNewData: NewPerfil = {
  nome: 'excepting',
  id: null,
};

Object.freeze(sampleWithNewData);
Object.freeze(sampleWithRequiredData);
Object.freeze(sampleWithPartialData);
Object.freeze(sampleWithFullData);
