export interface IPerfil {
  id: number;
  nome?: string | null;
  descricao?: string | null;
}

export type NewPerfil = Omit<IPerfil, 'id'> & { id: null };
