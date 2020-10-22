import React, { FC, useContext } from "react";
import { Input, Form } from "antd";
import get from "lodash/get";

import { Context } from "../Store";
import steps from "../steps";

import labels from "../../translations/labels";

import useCustomField, {
    ICustomFieldProperties,
} from "../../hooks/useCustomField";

import required from "../../validators/required";

interface IText {}

const Text: FC<IText & ICustomFieldProperties<string>> = (props) => {
    const { name, validators = [], valueChange, initialValue } = props;

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
            <Input
                value={value ?? undefined}
                onChange={(e) => {
                    setValue({ value: e.target.value });
                }}
                style={{ maxWidth: '500px'}}
            />
        </Form.Item>
    );
};

export default Text;
