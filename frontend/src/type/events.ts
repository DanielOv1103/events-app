export interface Event {
    _id: string;
    name: string;
    description: string;
    date: string;
    location: string;
    address: string;
    price: number;
    category: string;
    image: string;
    tags: string[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}