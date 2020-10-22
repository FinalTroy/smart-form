import { useContext, useMemo } from "react";
import steps from "../components/steps";
import { Context, IStoreField } from "../components/Store";
import get from "lodash/get";

const useStepProgress = () => {
    const { form, step } = useContext(Context);
    const { key } = steps[step];

    return useMemo(() => {
        const c = get(form, key, {}) as { [key: string]: IStoreField<any> };

        const loadedCount = Object.values(c).reduce(
            (pv, cv) => (cv.errorMessage === null ? pv + 1 : pv),
            0
        );

        return Math.floor(
            (loadedCount / Object.keys(c).length) * 100
        ) || 0;
    }, [form, key]);
};

export default useStepProgress;