import { Person } from '@/type/person';

const baseUrl = 'http://localhost:8000/';

    export const getPersons = async (): Promise<Person[]> => {
        try {
            const res = await fetch(`${baseUrl}persons`);
            const data = await res.json();
            console.log(data)
            return Array.isArray(data) ? data : [];
        } catch (err) {
            console.error('Error fetching persons:', err);
            return [];
        }
    };

export const getPerson = async (id: string): Promise<Person | null> => {
    try {
        const res = await fetch(`${baseUrl}persons/${id}`);
        const data = await res.json();
        return data.person as Person;
    } catch (err) {
        console.error('Error fetching person:', err);
        return null;
    }
};

export const createPerson = async (person: Omit<Person, 'id' | 'created_at' | 'updated_at'>): Promise<Person | null> => {
    try {
        const res = await fetch(`${baseUrl}persons`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });
        const data = await res.json();
        return data.person as Person;
    } catch (err) {
        console.error('Error creating person:', err);
        return null;
    }
};

export const updatePerson = async (id: string, person: Partial<Omit<Person, 'id' | 'created_at' | 'updated_at'>>): Promise<Person | null> => {
    try {
        const res = await fetch(`${baseUrl}persons/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });
        const data = await res.json();
        return data.person as Person;
    } catch (err) {
        console.error('Error updating person:', err);
        return null;
    }
};

export const deletePerson = async (id: string): Promise<boolean> => {
    try {
        const res = await fetch(`${baseUrl}persons/${id}`, {
            method: 'DELETE',
        });
        const data = await res.json();
        return data.success ?? true; // Asegúrate de que tu backend devuelve { success: true }
    } catch (err) {
        console.error('Error deleting person:', err);
        return false;
    }
};
