import React, { FC, useContext } from "react";
import { DatePicker, Form } from "antd";
import get from "lodash/get";

import { Context } from "../Store";
import steps from "../steps";

import labels from "../../translations/labels";

import useCustomField, {
    ICustomFieldProperties,
} from "../../hooks/useCustomField";

import required from "../../validators/required";
import moment from "moment";

interface IDate {
    dateFormat?: string;
}

const DEFAULT_DATE_FORMAT = "DD/MM/YYYY";
const DEFAULT_DISPLAY_DATE = "01/01/1900";

const Date: FC<IDate & ICustomFieldProperties<string>> = (props) => {
    const {
        name,
        validators = [],
        valueChange,
        initialValue,
        dateFormat = DEFAULT_DATE_FORMAT,
    } = props;

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

    const { key } = steps[step];

    return (
        <Form.Item
            validateStatus={!!errorMessage ? "error" : undefined}
            help={errorMessage}
            label={get(labels, `${key}.${name}.${language}`) || name}
            required={validators.includes(required)}
        >
            <DatePicker
                value={moment(value ?? DEFAULT_DISPLAY_DATE, dateFormat)}
                format={dateFormat}
                onChange={(value) =>
                    setValue({ value: value?.format(dateFormat) ?? null })
                }
                allowClear={false}
                style={{ width: '100%', maxWidth: '500px'}}
            />
        </Form.Item>
    );
};

export default Date;
