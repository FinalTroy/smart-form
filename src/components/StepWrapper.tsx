import React, { FC, useContext, useMemo } from "react";

import steps from "./steps";
import { Context } from "./Store";

// import steps from "./steps";

const StepWrapper: FC = () => {
    const { step } = useContext(Context);

    const { component: StepComponent } = useMemo(() => steps[step], [step]);

    return <>{StepComponent && <StepComponent />}</>;
};

export default StepWrapper;
