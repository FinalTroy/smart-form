import React, { FC, useContext } from "react";
import { Select as AntSelect, Form } from "antd";
import get from "lodash/get";

import { Context } from "../Store";
import steps from "../steps";

import labels from "../../translations/labels";

import useCustomField, {
    ICustomFieldProperties,
} from "../../hooks/useCustomField";

import required from "../../validators/required";

export interface AbstractCodeBook {
    Id: string;
    IdRef?: number;
    Value: string;
    Description: string;
    IsDeleted?: boolean;
    IsValid?: boolean;
}
interface ISelect {
    multiple?: boolean; // parameter used for multiSelect mode, default false
    data: AbstractCodeBook[]; // Needs to be fix incase we dont put codebooks into Select
}

const Select: FC<ISelect & ICustomFieldProperties<string | string[]>> = (
    props
) => {
    const {
        name,
        data,
        validators = [],
        valueChange,
        multiple = false,
        initialValue,
    } = props;

    const { value, errorMessage, setValue } = useCustomField<string | string[]>(
        name,
        validators,
        valueChange,
        initialValue
    );
    const {
        settings: { language },
        step,
    } = useContext(Context);

    // TODO: filtered steps fix
    const { key } = steps[step];

    return (
        <Form.Item
            validateStatus={!!errorMessage ? "error" : undefined}
            help={errorMessage}
            label={get(labels, `${key}.${name}.${language}`) || name}
            required={validators.includes(required)}
        >
            <AntSelect
                mode={multiple ? "multiple" : undefined}
                allowClear={multiple}
                value={value ?? undefined}
                onChange={(value) => setValue({ value })}
                style={{ maxWidth: '500px'}}
            >
                {data.map(({ Value, Id, Description }) => (
                    <AntSelect.Option value={Value} key={Id}>
                        {Description}
                    </AntSelect.Option>
                ))}
            </AntSelect>
        </Form.Item>
    );
};

export default Select;
