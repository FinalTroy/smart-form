import React, { FC, useContext, useMemo } from "react";
import { Form, Cascader } from "antd";
import get from "lodash/get";

import { Context } from "../Store";
import steps from "../steps";

import labels from "../../translations/labels";

import useCustomField, {
    ICustomFieldProperties,
} from "../../hooks/useCustomField";

import required from "../../validators/required";

interface ILevelSelect {
    data: ICbNACE[];
}

interface ICbNACE {
    IdRef: number;
    Value: string;
    Description: string;
    IsValid: boolean;
    IsDeleted: boolean;
    DescriptionExtended: string;
    CodeSkCzNace: string;
    CodeSectionCzNace: string;
    CodeNace: string;
    NaceShortening: string;
    Parent: string | null;
    ParentId: string | null;
    Id: string;
}

const LevelSelect: FC<ILevelSelect & ICustomFieldProperties<string[]>> = (
    props
) => {
    const { name, data, validators = [], valueChange, initialValue } = props;

    const { value, errorMessage, setValue } = useCustomField<string[]>(
        name,
        validators,
        valueChange,
        initialValue
    );

    const {
        settings: { language },
        step,
    } = useContext(Context);

    const createNace = useMemo(() => {
        const createNaceList = (parent?: ICbNACE): ICbNACE[] =>
            data
                .filter(({ ParentId }) =>
                    !parent ? !ParentId : ParentId === parent.Id
                )
                .map((child) => {
                    return {
                        ...child,
                        value: child.Value,
                        label: child.DescriptionExtended,
                        children: createNaceList(child),
                    };
                });
        return createNaceList();
    }, [data]);

    // TODO: filtered steps fix
    const { key } = steps[step];

    // Display CbNACE code
    const displayRender = (labels: any[], selectedOptions: any) =>
        labels.map((label, i) => {
            const option = selectedOptions[i];
            if (i === labels.length - 1) {
                return (
                    <span key={option.value}>
                        {label} (
                        <a onClick={(e) => e.stopPropagation()}>
                            {option.NaceShortening}
                        </a>
                        )
                    </span>
                );
            }
            return <span key={option.value}>{label} / </span>;
        });
    // optional fulltext filtering
    const filter = (inputValue: any, path: any) => {
        return path.some(
            (option: { label: string }) =>
                option.label.toLowerCase().indexOf(inputValue.toLowerCase()) >
                -1
        );
    };
    return (
        <Form.Item
            validateStatus={!!errorMessage ? "error" : undefined}
            help={errorMessage}
            label={get(labels, `${language}.${key}.${name}`, "N/A")}
            required={validators.includes(required)}
        >
            <Cascader
                options={createNace}
                value={value ?? undefined}
                expandTrigger="hover"
                onChange={(value) =>
                    setValue({ value: value as string[] })
                }
                displayRender={displayRender}
                showSearch={{ filter }}
                style={{ maxWidth: '500px'}}
            />
        </Form.Item>
    );
};

export default LevelSelect;
