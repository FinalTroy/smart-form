import React, { FC, useContext } from "react";
import { Form, Radio } from "antd";
import get from "lodash/get";

import { Context } from "../Store";
import steps from "../steps";

import labels from "../../translations/labels";

import useCustomField, {
    ICustomFieldProperties,
} from "../../hooks/useCustomField";

import required from "../../validators/required";
import { AbstractCodeBook } from "./Select";

interface IRadioGroup {
    data: AbstractCodeBook[]
}

const RadioGroup: FC<IRadioGroup & ICustomFieldProperties<string>> = (props) => {
    const { name, validators = [], valueChange, initialValue, data } = props;

    const { value, errorMessage, setValue } = useCustomField<string>(
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
            <Radio.Group value={value} onChange={e => setValue({value: e.target.value})}>
                {data.map(({ Value, Id, Description }) => (
                    <Radio value={Value} key={Id}>{Description}</Radio>
                ))}
            </Radio.Group>
        </Form.Item>
    );
};

export default RadioGroup;
