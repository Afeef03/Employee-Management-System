import axiosInstance from "./index";
import type { EmployeeType } from "../../types";

export const fetchEmployees = async (
    filters: Record<string, string[]>,
    signal?: AbortSignal,
    searchTerm?: string
): Promise<EmployeeType[]> => {
    const queryParams = new URLSearchParams();

    Object.entries(filters).forEach(([key, values]) => {
        values.forEach((val) => queryParams.append(key, val));
    });

    if (searchTerm) {
        queryParams.append("search", searchTerm);
    }

    const token = localStorage.getItem("token");

    const response = await axiosInstance.get(`/employees?${queryParams.toString()}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        signal,
    });

    return response.data.data.employees;
};


export const fetchGraphData = async () => {
    try {
        const response = await axiosInstance.get('/employees/joining-stats');

        return response.data.data;

    } catch (error) {
        console.log(error)
    }
}

export const searchEmployees = async () => {

}