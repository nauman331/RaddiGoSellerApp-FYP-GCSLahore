import { apiURL } from "../utils/exports";
import { useMutation } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

interface UseSubmitParams {
    method?: string;
    endpoint?: string;
    isAuth?: boolean;
}

export const useSubmit = ({ method = "POST", endpoint, isAuth = false }: UseSubmitParams) => {
    const { token } = useSelector((state: RootState) => state.auth);

    const mutation = useMutation({
        mutationFn: async (data: any) => {
            const response = await fetch(`${apiURL}${endpoint}`, {
                method,
                headers: {
                    "Content-Type": "application/json",
                    ...(isAuth && { Authorization: `Bearer ${token}` }),
                },
                body: JSON.stringify(data),
            });
            console.log('Response Status:', response);
            return response.json();
        }
    });

    return mutation;
};