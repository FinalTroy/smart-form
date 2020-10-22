import { TValidator } from "./types";

import isArray from "lodash/isArray";

const required: TValidator<string | string[]> = (e, v) => {
    // TODO: rewrite to error codes
    if (!e || (isArray(e) && !e.length)) return "This field is required";

    return null;
};

export default required;
