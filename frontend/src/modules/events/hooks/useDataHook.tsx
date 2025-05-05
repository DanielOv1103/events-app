import { useEffect, useState } from "react";
import { Event } from "@/type/events";
import { Exhibitor } from "@/type/exhibitor"; // Asegúrate de tener esta interfaz
import { getEvents } from "@/api/eventsServices";
import { getExhibitors } from "@/api/exhibitorServices";

export const useDataHook = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);

        try {
            const [eventsData, exhibitorsData] = await Promise.all([
                getEvents(),
                getExhibitors()
            ]);

            setEvents(eventsData);
            setExhibitors(exhibitorsData);
        } catch (err) {
            console.error("Error al cargar los datos:", err);
            setError("Error al cargar eventos o expositores");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return {
        events,
        exhibitors,
        loading,
        error,
        refetch: fetchData,
    };
};
