import { createEvent, deleteEvent, getEvents, updateEvent } from '../../api/eventsServices'
import CreateEvent from "./Create-Events"
import CardEvents from "./Card-Events"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useState, useEffect } from 'react'
import { Event } from '../../type/Events'

const EventDashboard = () => {
    const [events, setEvents] = useState<Event[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)

    const fetchEvents = () => {
        setLoading(true);
        getEvents()
            .then((events) => {
                console.log(events);  // Verifica que todos los eventos tengan un _id
                setEvents(events);
            })
            .catch((err) => {
                console.error('Error fetching events:', err);
                setError('Error al cargar eventos');
            })
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        fetchEvents()
    }, [])

    const handleEditEvent = (event: Event) => {
        setCurrentEvent(event)
        setIsCreating(false)
        setIsFormOpen(true)
    }

    const handleOpenCreateForm = () => {
        setCurrentEvent(null)
        setIsCreating(true)
        setIsFormOpen(true)
    }

    const handleDeleteEvent = async (evt: Event) => {
        if (!evt._id) {
            setError("No se puede eliminar un evento sin ID");
            console.error('Intento de eliminar evento sin ID:', evt);
            return;
        }
        
        try {
            await deleteEvent(evt._id);
            fetchEvents();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsFormOpen(false);
            setCurrentEvent(null);
        }
    }

    const handleCreateEvent = async (eventData: Event) => {
        setError(null)
        setSuccess(null)
        try {
            const formattedEvent = {
                ...eventData,
                date: new Date(eventData.date).toISOString(),
            }

            await createEvent(formattedEvent)
            setSuccess('Evento creado correctamente')
            fetchEvents()
            setIsFormOpen(false)
        } catch (err: any) {
            console.error('Error creating event:', err)
            setError(err.message)
        }
    }


    const handleSaveEditEvent = async (eventData: Event) => {
        try {
            if (!eventData._id) throw new Error("Falta el ID del evento a editar")
    
            await updateEvent(eventData._id, eventData)
            setSuccess("Evento actualizado correctamente")
            fetchEvents()
        } catch (err: any) {
            setError(err.message)
        } finally {
            setIsFormOpen(false)
            setCurrentEvent(null)
        }
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Eventos Destacados</h1>
                <Button
                    onClick={handleOpenCreateForm}
                    className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all text-white duration-300"
                >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Nuevo Evento
                </Button>
            </div>

            <hr className='mb-8 border-gray-200 border' />

            {loading ? (
                <p className="text-center">Cargando eventos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map(evt => (
                        <CardEvents
                            key={evt._id}
                            event={evt}
                            onEdit={() => handleEditEvent(evt)}
                            onDelete={() => handleDeleteEvent(evt)}
                        />
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 mt-4">{error}</div>
            )}

            {isFormOpen && (
                <CreateEvent
                    event={currentEvent}
                    onSave={isCreating ? handleCreateEvent : handleSaveEditEvent}
                    onCancel={() => setIsFormOpen(false)}
                />
            )}
        </div>
    )
}

export default EventDashboard
