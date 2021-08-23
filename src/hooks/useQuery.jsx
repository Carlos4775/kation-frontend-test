import { useLocation } from "react-router";
import { useHistory } from "react-router-dom";

const useQuery = () => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const setParams = (params = {}) => {
    for (const param in params) {
      searchParams.set(param, params[param]);
    }
    history.push(`${location.pathname}?${searchParams}`);
  };
  return [searchParams, setParams];
};

export default useQuery;
