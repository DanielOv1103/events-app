import { Exhibitor } from '@/type/exhibitor';

const baseUrl = 'http://localhost:8000/';

    export const getExhibitors = async (): Promise<Exhibitor[]> => {
        try {
            const res = await fetch(`${baseUrl}exhibitors`);
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.error('Error fetching persons:', err);
            return [];
        }
    };

export const getExhibitor = async (id: string): Promise<Exhibitor | null> => {
    try {
        const res = await fetch(`${baseUrl}exhibitors/${id}`);
        const data = await res.json();
        return data.person as Exhibitor;
    } catch (err) {
        console.error('Error fetching person:', err);
        return null;
    }
};

export const createExhibitor = async (person: Omit<Exhibitor, 'id' | 'created_at' | 'updated_at'>): Promise<Exhibitor | null> => {
    try {
        const res = await fetch(`${baseUrl}exhibitors`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });
        const data = await res.json();
        return data.person as Exhibitor;
    } catch (err) {
        console.error('Error creating person:', err);
        return null;
    }
};

export const updateExhibitor = async (id: string, person: Partial<Omit<Exhibitor, 'id' | 'created_at' | 'updated_at'>>): Promise<Exhibitor | null> => {
    try {
        const res = await fetch(`${baseUrl}exhibitors/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });
        const data = await res.json();
        return data.person as Exhibitor;
    } catch (err) {
        console.error('Error updating person:', err);
        return null;
    }
};

export const deleteExhibitor = async (id: string): Promise<boolean> => {
    try {
        const res = await fetch(`${baseUrl}exhibitors/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        return data.success ?? true; // Asegúrate de que tu backend devuelve { success: true }
    } catch (err) {
        console.error('Error deleting person:', err);
        return false;
    }
};
