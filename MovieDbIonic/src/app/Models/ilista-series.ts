import { ISerieModel } from "./iserie-model";

export interface IListaSeries {
    page: number;
    results: ISerieModel[];
    total_results: number;
    total_pages: number;
}
