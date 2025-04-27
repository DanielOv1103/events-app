import { Event } from '../type/Events';

const API_BASE_URL = 'http://127.0.0.1:8000'; // Ajusta según tu backend

export const getEvents = async (): Promise<Event[]> => {
    const response = await fetch(`${API_BASE_URL}/events`);
    if (!response.ok) {
        throw new Error('Error fetching events');
    }
    
    return response.json();
};

export const createEvent = async (event: Omit<Event, '_id'>): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error('Error creating event');
    }
    return response.json();
};

export const updateEvent = async (id: string, event: Omit<Event, '_id'>): Promise<Event> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(event),
    });
    if (!response.ok) {
        throw new Error('Error updating event');
    }
    return response.json();
};

export const deleteEvent = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
        method: 'DELETE',
    });
    if (!response.ok) {
        throw new Error('Error deleting event');
    }
};