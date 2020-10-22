import React, { FC, useContext } from "react";

import required from "../../validators/required";

// temporary (for testing purposes)
import CbNACE from "../../data/mock/CbNACE";

import { Context } from "../Store";
import get from "lodash/get";
import Select from "../inputComponents/Select";
import RadioGroup from "../inputComponents/RadioGroup";
import CbCompanySize from "../../data/mock/CbCompanySize";
import CbRiskActivityFO from "../../data/mock/CbRiskActivityFO";
import LevelSelect from "../inputComponents/LevelSelect";
import Agreement, { AgreementEnum } from "../../data/mock/Agreement";
const ClientIdentification: FC = () => {
    const { form } = useContext(Context);

    return (
        <>
            <LevelSelect
                name="Vyberte převažující ekonomickou činnost v podnikání žadatele"
                data={CbNACE}
                validators={[required]}
            />
            <RadioGroup
                name="HasAnyRiskActivity"
                data={Agreement}
                validators={[required]}
            />
            {get(form, "ClientEconomicActivity.HasAnyRiskActivity.value") ===
                AgreementEnum.YES && (
                <Select
                    name="RiskActivityList"
                    data={CbRiskActivityFO}
                    validators={[required]}
                />
            )}
            <Select
                name="CnbAnCompanySizeId"
                data={CbCompanySize}
                validators={[required]}
            />
        </>
    );
};

export default ClientIdentification;
