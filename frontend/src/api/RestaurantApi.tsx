import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error("Something went wrong while fetching restaurant data");
        }

        return response.json();
    }

    const { data: restaurant, isLoading } = useQuery("fetchRestaurant", getRestaurantRequest);

    return {
        restaurant,
        isLoading
    }
}

export const useCreateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });

        if (!response.ok) {
            throw new Error("Something went wrong")
        }

        return response.json();
    };

    const { mutate: createRestaurant, isLoading, isSuccess, error } = useMutation(createRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant created")
    }

    if (error) {
        toast.error("Unable to create restaurant")
    }

    return {
        createRestaurant,
        isLoading,
    }
}

export const useUpdateRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const updateRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_URL}/api/my/restaurant`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData
        });

        if (!response.ok) {
            throw new Error("Something went wrong");
        }

        return response.json();
    }

    const { mutate: updateRestaurant, isLoading, isSuccess, error } = useMutation(updateRestaurantRequest);

    if (isSuccess) {
        toast.success("Restaurant updated")
    }

    if (error) {
        toast.error("Unable to update restaurant")
    }

    return {
        updateRestaurant,
        isLoading
    }
}