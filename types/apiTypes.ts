export interface SubModule {
  id: string;
  Descricao: string;
}

export interface Module {
  id: number;
  Descricao: string;
  subModulos: SubModule[];
}
