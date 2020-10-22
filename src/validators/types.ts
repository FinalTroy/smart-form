import { IStore } from "../components/Store";
export type TValidator<T> = (
    value: T | null | undefined,
    store?: IStore
) => null | string;
