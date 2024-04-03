import { CartItem } from "@/pages/RestaurantDetailsPage";
import { Restaurant } from "@/types"
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";

type OrderProps = {
    restaurant: Restaurant;
    cartItems: CartItem[];
};

const UserOrder = ({ restaurant, cartItems }: OrderProps) => {

    const getTotalOrderCost = () => {
        const totalCost = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

        const totalWithDelivery = totalCost + restaurant.deliveryPrice;

        return (totalWithDelivery / 100).toFixed(2);
    };

    return (
        <>
            <CardHeader>
                <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
                    <span>Your order:</span>
                    <span>${getTotalOrderCost()}</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-5">
                {cartItems.map((item, index) => (
                    <div className="flex justify-between" key={index}>
                        <span>
                            <Badge variant='outline' className="mr-2">
                                {item.quantity}
                            </Badge>
                            {item.name}
                        </span>
                        <span className="flex items-center gap-1">
                            ${((item.price * item.quantity) / 100).toFixed(2)}
                        </span>
                    </div>
                ))}
                <Separator />
                <div className="flex justify-between">
                    <span>Delivery:</span>
                    <span>${(restaurant.deliveryPrice / 100).toFixed(2)}</span>
                </div>
                <Separator />

            </CardContent>
        </>
    )
}

export default UserOrder