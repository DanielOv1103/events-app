interface Distribution {
    name: string;
    capacity: number;
    ocuped: number;
    price: number;//go
}
export interface Event {
    _id: string;//go
    id_exhibitor: string[]; //go
    name: string;//go
    description: string;//go
    date: string;//go
    address: string;//go   
    category: string;//go
    total_capacity: number;
    image: string;//go
    tags: string[];//go
    distribution: Distribution[];
    is_active: boolean;
    created_at: string;
    updated_at: string;
}