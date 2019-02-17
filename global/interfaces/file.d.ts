import { IModel } from './model';

export interface IFile extends IModel {
    id?: number;
    name?: string;
    path?: string;
    type?: string;
    size?: number;
}