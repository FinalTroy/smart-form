import React, { FC, useContext } from "react";

import Text from "../inputComponents/Text";

import required from "../../validators/required";
import isNumber from "../../validators/isNumber";

// temporary (for testing purposes)
import cbPartyLegalForm from "../../data/mock/CbPartyLegalForm";
import CbCountry from "../../data/mock/CbCountry";

import { Context } from "../Store";
import Select from "../inputComponents/Select";
import Date from "../inputComponents/Date";
import CbPartyLegalFormWithPerson from "../../data/mock/CbPartyLegalFormWithPerson";
import RadioGroup from "../inputComponents/RadioGroup";
import CbIdentificationDocumentType from "../../data/mock/CbIdentificationDocumentType";

// hooks
import useQueryParser from "../../hooks/useQueryParser";
import { PersonType } from "../steps";

const ClientIdentification: FC = () => {
    const {
        settings: { personType, partyId },
        setStoreState = () => {},
    } = useContext(Context);
    
    const { legalForm } = useQueryParser();

    return (
        <>
            <Select
                name="PartyPoIdentificatorCountryId"
                data={CbCountry}
                initialValue={"CZ"}
                validators={[required]}
            />
            <Text name="CompanyIdNr" validators={[required, isNumber]} />
            <Select
                name="LegalFormId"
                data={CbPartyLegalFormWithPerson}
                validators={[required]}
                initialValue={
                    !partyId ? (legalForm as string | undefined) : undefined
                }
                valueChange={(v, i) => {
                    // TODO: add dialog saying that everything resets
                    setStoreState((pv) => ({
                        ...pv,
                        settings: {
                            ...pv.settings,
                            personType:
                                cbPartyLegalForm.find((p) => p.Value === v)
                                    ?.Person.IdRef ?? null,
                        },
                    }));
                }}
            />
            <Text name="ClientsBusinessName" validators={[required]} />
            <Text name="ClientsBusinessNameExtd" validators={[required]} />
            {personType === PersonType.FO && (
                <>
                    <Select
                        name="IdentificatorCountryId"
                        data={CbCountry}
                        initialValue={"CZ"}
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
                </>
            )}
        </>
    );
};

export default ClientIdentification;
