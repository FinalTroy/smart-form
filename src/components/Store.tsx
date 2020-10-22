import React, {
    FC,
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from "react";

export interface IStoreField<T> {
    errorMessage: string | null;
    value: T | null;
}

// export interface IStoreInputRequired<T> extends Required<IStoreInput<T>> {}

export interface IStore {
    form: {
        ClientIdentification?: {
            CompanyIdNr?: IStoreField<string>;
            LegalFormId?: IStoreField<number>;
            a?: IStoreField<string>;
        };
    };
    settings: {
        language: "cs" | "en";
        testMode: boolean;
        // form specific
        partyId: number | null; // edit mode
        personType: number | null; // FO, PO, FOP
    };
    step: number;
}

interface IStoreActions {
    setStoreState?: Dispatch<SetStateAction<IStore>>;
}

const defaultStoreState: IStore = {
    form: {},
    settings: {
        language: "cs",
        testMode: false,
        partyId: null,
        personType: null,
    },
    step: 0,
};

export const Context = createContext<IStore & IStoreActions>(defaultStoreState);

const Store: FC = ({ children }) => {
    const [storeState, setStoreState] = useState<IStore>(defaultStoreState);

    return (
        <Context.Provider value={{ ...storeState, setStoreState }}>
            {children}
        </Context.Provider>
    );
};

export default Store;
