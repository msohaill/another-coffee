import { Category } from './enums/Category'
import { Item } from './Item';

export type Receipt = {
    id: number;

    vendor: string;

    date: number;

    tax: number;

    total: number;

    category: Category;

    items: Item[];
}
