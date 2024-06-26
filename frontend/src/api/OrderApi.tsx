import { Order } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_API_URL;

export const useGetMyOrders = () => {
    const { getAccessTokenSilently } = useAuth0();

    const getMyOrdersRequest = async (): Promise<Order[]> => {
        const accessToken = getAccessTokenSilently();

        const response = await fetch(`${API_URL}/api/order`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to get orders');
        }

        return response.json();

    }

    const { data: orders, isLoading } = useQuery('fetchMyOrders', getMyOrdersRequest);

    return {
        orders,
        isLoading
    }
}

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deliveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string;
        country: string
    };
    restaurantId: string
};

export const useCreateCheckoutSession = () => {
    const { getAccessTokenSilently } = useAuth0();

    const useCreateCheckoutSessionRequest = async (checkoutSessionRequest: CheckoutSessionRequest) => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_URL}/api/order/checkout/create-checkout-session`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(checkoutSessionRequest)
        });

        if (!response.ok) {
            throw new Error('Unable to create checkout session');
        }

        return response.json();
    };

    const { mutateAsync: createCheckoutSession, isLoading, error, reset } = useMutation(useCreateCheckoutSessionRequest);

    if (error) {
        toast.error(error.toString());
        reset();
    }

    return {
        createCheckoutSession,
        isLoading
    }
}