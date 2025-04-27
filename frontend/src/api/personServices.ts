const baseUrl = 'http://localhost:8000/';

export const getPersons = () => {
    return fetch(`${baseUrl}persons`)
        .then(res => res.json())
        .then(data => data.persons)
        .catch(err => console.error('Error fetching persons:', err));
};

export const getPerson = (id: string) => {
    return fetch(`${baseUrl}persons/${id}`)
        .then(res => res.json())
        .then(data => data.person)
        .catch(err => console.error('Error fetching person:', err));
};

export const createPerson = (person: any) => {
    return fetch(`${baseUrl}persons`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
    })
        .then(res => res.json())
        .then(data => data.person)
        .catch(err => console.error('Error creating person:', err));
};

export const updatePerson = (id: string, person: any) => {
    return fetch(`${baseUrl}persons/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(person),
    })
        .then(res => res.json())
        .then(data => data.person)
        .catch(err => console.error('Error updating person:', err));
};

export const deletePerson = (id: string) => {
    return fetch(`${baseUrl}persons/${id}`, {
        method: 'DELETE',
    })
        .then(res => res.json())
        .then(data => data.person)
        .catch(err => console.error('Error deleting person:', err));
};