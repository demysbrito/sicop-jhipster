import dayjs from 'dayjs/esm';
import { ITopico } from 'app/entities/topico/topico.model';

export interface IAjuda {
  id: string;
  titulo?: string | null;
  conteudo?: string | null;
  ativo?: boolean | null;
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  deletedAt?: dayjs.Dayjs | null;
  topicos?: ITopico[] | null;
}

export type NewAjuda = Omit<IAjuda, 'id'> & { id: null };
