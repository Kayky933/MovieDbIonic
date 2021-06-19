import { IFilmeModel } from "./ifilme-model";

export interface IListaFilmes {
  page: number;
  results: IFilmeModel[];
  total_results: number;
  total_pages: number;
}
