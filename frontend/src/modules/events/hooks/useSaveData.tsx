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
            const timestamp = new Date().toISOString();

            if (data._id) {
                // Editar evento: solo actualizar updated_at
                const updatedData = {
                    ...data,
                    updated_at: timestamp,
                };
                console.log("Datos del evento enviados:", updatedData);
                response = await updateEvent(data._id, updatedData);
                console.log("Evento actualizado:", response);
            } else {
                // Crear nuevo evento: agregar created_at y updated_at
                const newData = {
                    ...data,
                    created_at: timestamp,
                    updated_at: timestamp,
                };
                console.log("Datos del evento enviados:", newData);
                response = await createEvent(newData);
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
