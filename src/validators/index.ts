import { TValidator } from "./types";

function validate<T>(value: T | null | undefined, validators: TValidator<T>[]) {
    let errorMessage = null;

    for (const validator of validators) {
        if ((errorMessage = validator(value))) break;
    }

    return errorMessage;
}

export default validate;
