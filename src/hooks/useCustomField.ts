import { useCallback, useContext, useMemo, useRef, useEffect } from "react";
import get from "lodash/get";

import { Context, IStoreField } from "../components/Store";
import { TValidator } from "../validators/types";

import steps from "../components/steps";

import validate from "../validators";

type TValueChange<T> = (value: T | null, isInitial: boolean) => void;

export interface ICustomFieldProperties<T> {
    name: string;
    dependencies?: string[];
    validators?: TValidator<T>[];
    valueChange?: TValueChange<T>;
    initialValue?: T;
}

function useCustomField<T>(
    name: string,
    validators: TValidator<T>[],
    valueChange?: TValueChange<T>,
    initialValue?: T
) {
    // validate on value change
    const store = useContext(Context);
    const { step, setStoreState = () => {} } = store;
    const { key } = steps[step];
    const { value = undefined, errorMessage = null } = get(
        store.form,
        `${key}.${name}`,
        {}
    ) as IStoreField<T>;

    // TODO: add dialog state to store (dependencies)

    const setValue = useCallback(
        (storeField: Partial<IStoreField<T>>) => {
            setStoreState((previousStore) => {
                return {
                    ...previousStore,
                    form: {
                        ...previousStore.form,
                        [key]: {
                            ...get(previousStore.form, key, {}),
                            [name]: {
                                ...get(
                                    previousStore.form,
                                    `${key}.${name}`,
                                    {}
                                ),
                                ...storeField,
                            },
                        },
                    },
                };
            });
        },
        [setStoreState, key, name]
    );

    // derender (remove from state in case still in step but not rendered)
    // memoize current step, remove if current step is equal to previous (not when changing)
    useEffect(
        () => () => {
            setStoreState((pv) => {
                const stepValues = get(pv.form, key);
                const { key: currentKey } = steps[pv.step];

                if (key === currentKey) {
                    delete stepValues[name];
                }

                return {
                    ...pv,
                    form: {
                        ...pv.form,
                        [key]: {
                            ...stepValues,
                        },
                    },
                };
            });
        },
        [key, name, setStoreState]
    );

    // TODO: fix validation on value === undefined (not needed)
    const newErrorMessage = useMemo(() => validate<T>(value, validators), [
        value,
        validators,
    ]);

    // check if value changed to set new errorMessage
    const valueReference = useRef<T | null | undefined>(value);

    // is used to tell difference between initial render change and all of the others
    const isInitialReference = useRef<boolean>(true);

    useEffect(() => {
        // initialize input state
        if (value === undefined)
            return setValue({ value: initialValue ?? null });

        // every time value or errorMessage changes, update that errorMessage
        if (valueReference.current === value) return;
        setValue({ errorMessage: newErrorMessage });
        if (valueChange) valueChange(value, isInitialReference.current);
        isInitialReference.current = false;
        valueReference.current = value;
    }, [
        value,
        validators,
        setValue,
        newErrorMessage,
        valueChange,
        initialValue,
    ]);

    return { value, errorMessage, setValue };
}

export default useCustomField;
