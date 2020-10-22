import React, { FC, useContext } from "react";

import Text from "../inputComponents/Text";

import required from "../../validators/required";

import { Context } from "../Store";
import get from "lodash/get";
import Select from "../inputComponents/Select";
import CbCountry from "../../data/mock/CbCountry";
import RadioGroup from "../inputComponents/RadioGroup";

// hooks
import Agreement, { AgreementEnum } from "../../data/mock/Agreement";
import CbRiskActivityFO from "../../data/mock/CbRiskActivityFO";
import CbIdentificationDocumentType from "../../data/mock/CbIdentificationDocumentType";
import Date from "../inputComponents/Date";

const OtherInformationFo: FC = () => {
    const { form } = useContext(Context);
    return (
        <>
            <RadioGroup
                name="HasAnyRiskActivity"
                data={Agreement}
                validators={[required]}
            />
            {get(form, "OtherInformationFo.HasAnyRiskActivity.value") ===
                AgreementEnum.YES && (
                <Select
                    name="RiskActivityList"
                    data={CbRiskActivityFO}
                    validators={[required]}
                />
            )}
            <Text name="FirstName" validators={[required]} />
            <Text name="LastName" validators={[required]} />
            {/* <Date name="DateOfBirth" validators={[required]} /> */}
            <Select
                name="BirthCountryId"
                data={CbCountry}
                validators={[required]}
            />
            <Select
                name="Citizenship"
                data={CbCountry}
                validators={[required]}
            />
            <RadioGroup
                name="HasAnotherCitizenship"
                data={Agreement}
                initialValue={AgreementEnum.NO}
                validators={[required]}
            />
            {get(form, "OtherInformationFo.HasAnotherCitizenship.value") ===
                AgreementEnum.YES && (
                <Select
                    name="AnotherCitizenship"
                    data={CbCountry}
                    multiple={true}
                    validators={[required]}
                />
            )}
            {/* <Select
                name="PartyFoIdentificators.PartyFoIdentificatorCountryId"
                data={CbCountry}
                validators={[required]}
            />
            <RadioGroup
                name="PartyFoIdentificators.PartyFoIdentificatorTypeId"
                data={CbIdentificationDocumentType.filter(
                    (x) =>
                        x.Value === "Občanský průkaz" ||
                        x.Value === "Cestovní pas"
                )}
                validators={[required]}
            />
            <Text
                name="PartyFoIdentificators.PersonalNumber"
                validators={[required, isNumber]}
            /> */}
            <Select
                name="IdentificatorCountryId"
                data={CbIdentificationDocumentType}
                validators={[required]}
            />
            <RadioGroup
                name="IdentificatorTypeId"
                data={CbIdentificationDocumentType.filter(
                    (x) =>
                        x.Value === "Občanský průkaz" ||
                        x.Value === "Cestovní pas"
                )}
                validators={[required]}
            />
            <Date name="DateValidFrom" validators={[required]} />
            <Date name="DateValidTo" validators={[required]} />
            <Text name="Identificator" validators={[required]} />
            <Text name="OriginAuthority" validators={[required]} />
            <Text name="PlaceofBirth" validators={[required]} />
            <Text name="SexId" validators={[required]} />
            <RadioGroup
                name="HasAnyForeignCountryResidence"
                data={Agreement}
                validators={[required]}
            />
            {get(
                form,
                "OtherInformationFo.HasAnyForeignCountryResidence.value"
            ) === AgreementEnum.YES && (
                <Select
                    name="ForeignCountryResidence"
                    data={CbCountry}
                    validators={[required]}
                />
            )}
            <Text name="DescriptiveNr" validators={[required]} />
            <Text name="Street" validators={[required]} />
            <Text name="IndicativeNr" validators={[required]} />
            <Text name="Zip" validators={[required]} />
            <Text name="CountryId" validators={[required]} />
            <Select name="City" data={CbCountry} validators={[required]} />
        </>
    );
};

export default OtherInformationFo;
