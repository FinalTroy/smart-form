import { useContext, useMemo } from "react";
import steps from "../components/steps";
import { Context } from "../components/Store";

const useStepFilter = () => {
    const {
        settings: { personType },
    } = useContext(Context);

    return useMemo(() => {
        if (personType === null) return steps.map((step) => step.key);

        return steps
            .filter((step) => step.visibleTo.includes(personType))
            .map((step) => step.key);
    }, [personType]);
};

export default useStepFilter;
