import { createEvent, updateEvent } from "@/api/eventsServices";
import { useState } from "react";
import { Event } from "@/type/events";

export const useSaveData = () => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const saveData = async (data: Event): Promise<Event | null> => {
        setIsSaving(true);
        setError(null);

        try {
            if (!data.name || !data.date) {
                setError("El nombre y la fecha del evento son obligatorios");
                return null;
            }

            let response: Event;
            const timestamp = new Date().toISOString();

            if (data._id) {
                const updatedData = {
                    ...data,
                    updated_at: timestamp,
                };
                console.log("Datos del evento enviados (actualizar):", updatedData);
                response = await updateEvent(data._id, updatedData);

                
                console.log("Evento actualizado:", response);
            } else {
                const newData = {
                    ...data,
                    created_at: timestamp,
                    updated_at: timestamp,
                };
                console.log("Datos del evento enviados (crear):", newData);
                response = await createEvent(newData);
                console.log("Evento creado:", response);
            }

            return response;
        } catch (err: unknown) {
            if (err instanceof Error) {
                console.error("Error al guardar evento:", err.message);
                setError(err.message);
            } else {
                console.error("Error desconocido al guardar evento:", err);
                setError("Error desconocido");
            }
            return null;
        } finally {
            setIsSaving(false);
        }
    };

    return {
        isSaving,
        error,
        saveData,
    };
};
