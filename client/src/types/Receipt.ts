import { Category } from './enums/Category'

export type Receipt = {
    id: number;

    vendor: string;

    date: Date;

    tax: number;

    total: number;

    category: Category;
}
