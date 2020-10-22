import { TValidator } from "./types";

const isNumber: TValidator<string> = (e, v) => {
    if (isNaN(+(e ?? ""))) return "This is not a number";
    return null;
};

export default isNumber;
