import dayjs from 'dayjs/esm';
import { IAjuda } from 'app/entities/ajuda/ajuda.model';
import { IAssunto } from 'app/entities/assunto/assunto.model';

export interface ITopico {
  id: string;
  titulo?: string | null;
  conteudo?: string | null;
  ativo?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  deletedAt?: dayjs.Dayjs | null;
  ajudas?: IAjuda[] | null;
  assuntos?: IAssunto[] | null;
}

export type NewTopico = Omit<ITopico, 'id'> & { id: null };
