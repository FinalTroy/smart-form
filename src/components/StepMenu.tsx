import React, { FC, useContext } from "react";
import { Steps } from "antd";
import { Context } from "./Store";
import steps from "./steps";

// hooks
// import useStepFilter from '../hooks/useStepFilter';

const StepMenu: FC<{
    progress: number;
    availableSteps: string[];
}> = (props) => {
    const { progress, availableSteps } = props;
    const { step } = useContext(Context);
    const { key } = steps[step];

    return (
        <Steps
            direction="vertical"
            size="small"
            current={availableSteps.indexOf(key)}
            percent={progress}
        >
            {steps.filter(s => availableSteps.includes(s.key)).map((s) => (
                <Steps.Step title={s.key} key={s.key} />
            ))}
        </Steps>
    );
};

export default StepMenu;
