import { useState, useEffect } from "react";
import { Event } from "@/type/events";
import { Exhibitor } from "@/type/exhibitor";
import CardExhibitors from "../exhibitors/Card-Exhibitors";
import { useDataHook } from "./hooks/useDataHook";
import Form from "./Form";
import { useSaveData } from "./hooks/useSaveData";
import { Separator } from "@/components/ui/separator";

const initialFormData: Event = {
    _id: "",
    name: "",
    description: "",
    date: "",
    address: "",
    price: 0,
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
    const [selectedExhibitor, setSelectedExhibitor] = useState<Exhibitor | null>(null);
    const [formData, setFormData] = useState<Event>(initialFormData);
    const { saveData, isSaving } = useSaveData();

    // Update exhibitorId in formData when a new exhibitor is selected
    useEffect(() => {
        if (selectedExhibitor) {
            setFormData(prev => ({ ...prev, id_exhibitor: [selectedExhibitor.id] }));
        }
    }, [selectedExhibitor]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFormData(prev => ({ ...prev, tags: value.split(",").map(tag => tag.trim()) }));
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
            setFormData(initialFormData);
            setSelectedExhibitor(null);
        }
    };

    if (loading) return <p>Cargando expositores...</p>;
    if (error) return <p>Error al cargar expositores: {error}</p>;

    return (
        <main className="flex items-center gap-4 p-4">
            <div className="w-1/2  p-4">
                <h2 className="text-lg font-bold mb-2">Selecciona un Expositor</h2>
                {exhibitors.map(exhibitor => (
                    <CardExhibitors
                        key={exhibitor.id}
                        exhibitor={exhibitor}
                        selectedExhibitor={selectedExhibitor}
                        setSelectedExhibitor={setSelectedExhibitor}
                    />
                ))}
            </div>
            <Separator orientation="vertical" className="w-full mr-4" />
            <div className="flex justify-center w-full p-4">
                <Form
                    formData={formData}
                    onChange={handleChange}
                    onTagsChange={handleTagsChange}
                    onCheckboxChange={handleCheckboxChange}
                    onCategoryChange={handleCategoryChange}
                    onSubmit={handleSubmit}
                />
            </div>
        </main>
    );
}
