import { useMemo } from "react";
import { useLocation } from "react-router-dom";
import { parse as parseQueryString } from "qs";

const useCustomQuery = () => {
    const { search } = useLocation();

    return useMemo(
        () => parseQueryString(search, { ignoreQueryPrefix: true }),
        [search]
    );
};

export default useCustomQuery;
