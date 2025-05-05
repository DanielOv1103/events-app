import { createEvent, updateEvent } from "@/api/eventsServices";
import { useState } from "react";
import { Event } from "@/type/events";

export const useSaveData = () => {
    const [isSaving, setIsSaving] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const saveData = async (data: Event) => {
        setIsSaving(true);
        setError(null);

        try {
            let response;

            if (data._id) {
                // Editar evento
                response = await updateEvent(data._id, data);
                console.log("Evento actualizado:", response);
            } else {
                // Crear nuevo evento
                response = await createEvent(data);
                console.log("Evento creado:", response);
            }

            return response;
        } catch (err) {
            console.error("Error al guardar evento:", err);
            setError("Error al guardar evento");
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
