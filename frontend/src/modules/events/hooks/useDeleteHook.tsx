import { deleteEvent } from "@/api/eventsServices";
import { useState } from "react";
import { Event } from "@/type/events";

export const useDeleteHook = (fetchEvents: () => void) => {
    const [error, setError] = useState<string | null>(null);
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
    const [currentEvent, setCurrentEvent] = useState<Event | null>(null);

    const handleDeleteEvent = async (event: Event) => {
        if (!event._id) {
            setError("No se puede eliminar un evento sin ID");
            console.error('Intento de eliminar evento sin ID:', event);
            return;
        }

        try {
            // Llamada a la API para eliminar el evento
            await deleteEvent(event._id);
            console.log(`Evento ${event.name} eliminado exitosamente.`);
            // Refrescar la lista de eventos después de la eliminación
            fetchEvents();
        } catch (err: any) {
            setError(err.message || "Error al eliminar el evento");
            console.error("Error al eliminar evento:", err);
        } finally {
            setIsFormOpen(false);  // Cerrar el formulario/modal
            setCurrentEvent(null);  // Resetear el evento actual
        }
    };

    return {
        error,
        isFormOpen,
        setIsFormOpen,
        currentEvent,
        setCurrentEvent,
        handleDeleteEvent,
    };
};
