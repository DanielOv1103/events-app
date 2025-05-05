interface Distribution {
    name: string;
    description: string;
    capacity: number;
    ocuped: number;
}
export interface Event {
    _id: string;
    id_exhibitor: string[];
    name: string;
    description: string;
    date: string;
    address: string;
    price: number;
    category: string;
    total_capacity: number;
    image: string;
    tags: string[];
    distribution: Distribution[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}