import { apiURL } from "../utils/exports";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface UseFetchParams {
    endpoint?: string;
    isAuth?: boolean;
}

export const useFetch = ({ endpoint, isAuth = false }: UseFetchParams) => {
    const { token } = useSelector((state: RootState) => state.auth);
    useQuery({
        queryKey: [endpoint],
        queryFn: async () => {
            const response = await fetch(`${apiURL}${endpoint}`, {
                headers: {
                    "Content-Type": "application/json",
                    ...(isAuth && { Authorization: `Bearer ${token}` }),
                },
            });
            return response.json();
        }
    })
}