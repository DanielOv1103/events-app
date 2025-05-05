import { useState, useEffect } from "react";
import { Event } from "@/type/events";
import { Exhibitor } from "@/type/exhibitor";
import CardExhibitors from "../exhibitors/Card-Exhibitors";
import { useDataHook } from "./hooks/useDataHook";
import Form from "./Form";
import { useSaveData } from "./hooks/useSaveData";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent } from "@/api/eventsServices";


const initialFormData: Event = {
    _id: "",
    name: "",
    description: "",
    date: "",
    address: "",
    category: "",
    image: "",
    created_at: "",
    updated_at: "",
    distribution: [],
    total_capacity: 0,
    tags: [""],
    is_active: false,
    id_exhibitor: [""],
};

export default function CreateEvent() {
    const { exhibitors, loading, error } = useDataHook();
    const [selectedExhibitors, setSelectedExhibitors] = useState<Exhibitor[]>([]);
    const [formData, setFormData] = useState<Event>(initialFormData);
    const { saveData, isSaving } = useSaveData();

    const { id } = useParams()
    const isEditMode = Boolean(id);
    const navigate = useNavigate();

    const handleDistributionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const [distName, field] = name.split("-");
        setFormData(prev => {
            const existingDist = prev.distribution.find(d => d.name === distName);
            const updatedDist = existingDist
                ? {
                    ...existingDist,
                    [field]: field === "price" || field === "capacity" ? Number(value) : value,
                }
                : {
                    name: distName,
                    price: 0,
                    capacity: 0,
                    ocuped: 0,
                    [field]: Number(value),
                };

            const newDistributions = prev.distribution.filter(d => d.name !== distName);
            return {
                ...prev,
                distribution: [...newDistributions, updatedDist],
            };
        });
    };

    // Update exhibitorId in formData when a new exhibitor is selected
    useEffect(() => {
        if (selectedExhibitors.length > 0) {
            // Mapea los exhibidores seleccionados a su id
            setFormData(prev => ({
                ...prev,
                id_exhibitor: selectedExhibitors.map(exhibitor => exhibitor._id),
            }));
        } else {
            setFormData(prev => ({ ...prev, id_exhibitor: [] }));
        }
    }, [selectedExhibitors]);

    useEffect(() => {
        const fetchEvent = async () => {
            if (isEditMode && id) {
                try {
                    const existingEvent = await getEvent(id);
                    setFormData(existingEvent);
                    // También puedes setear expositores seleccionados si es necesario
                } catch (error) {
                    console.error("Error cargando el evento:", error);
                }
            }
        };

        fetchEvent();
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            tags: value.split(',').map(tag => tag.trim()),
        }));
    };

    const handleExhibitorRemove = (id: string) => {
        const updatedExhibitors = formData.id_exhibitor.filter(exhibitorId => exhibitorId !== id);
        setFormData(prev => ({
            ...prev,
            id_exhibitor: updatedExhibitors,
        }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, is_active: e.target.checked }));
    };

    const handleCategoryChange = (value: string) => {
        setFormData(prev => ({ ...prev, category: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await saveData(formData);
        if (result) {
            alert("Evento guardado correctamente");
            navigate(`/events`)
            setFormData(initialFormData);
            setSelectedExhibitors([]);
        }
    };

    if (loading) return <p>Cargando expositores...</p>;
    if (error) return <p>Error al cargar expositores: {error}</p>;

    return (
        <main className="flex gap-4 p-4 container mx-auto px-4">
            <div className="w-full p-4">
                <h2 className="text-lg font-bold mb-2">Selecciona un Expositor</h2>
                {exhibitors.map(exhibitor => (
                    <CardExhibitors
                        key={exhibitor._id}
                        exhibitor={exhibitor}
                        selectedExhibitors={selectedExhibitors}
                        setSelectedExhibitors={setSelectedExhibitors}
                    />
                ))}
            </div>
            <div className="w-full p-4">
                <h2 className="text-lg font-bold mb-2">Formulario de evento</h2>
                <Form
                    formData={formData}
                    onChange={handleChange}
                    onTagsChange={handleTagsChange}
                    onCheckboxChange={handleCheckboxChange}
                    onCategoryChange={handleCategoryChange}
                    onSubmit={handleSubmit}
                    onDistributionChange={handleDistributionChange}
                    onExhibitorRemove={handleExhibitorRemove}
                />
            </div>
        </main>
    );
}
