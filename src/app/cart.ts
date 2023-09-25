export interface FoodItem {
    id: number;
    name: string;
    price: number;
}

export interface CartItem {
    id: number;
    userId: number;
    foodItemId: number;
    foodItemName: string;
    quantity: number;
    price: number;
}

export interface Cart {
    userId: number;
    items: CartItem[];
}
