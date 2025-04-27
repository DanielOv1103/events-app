import React, { useState, useEffect } from 'react'
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { Event } from '../../type/Events'

interface CreateEventProps {
    event?: Event | null
    onSave: (event: Event) => Promise<void>
    onCancel: () => void
}

const CreateEvent = ({ event, onSave, onCancel }: CreateEventProps) => {
    const [formData, setFormData] = useState<{
        name: string;
        description: string;
        date: string;
        location: string;
        address: string;
        price: number;
        category: string;
        image: string;
        tags: string[];
        is_active: boolean;
        _id: string;
    }>({
        name: '',
        description: '',
        date: '',
        location: '',
        address: '',
        price: 0,
        category: '',
        image: '',
        tags: [],
        is_active: false,
        _id: "",
    });


    useEffect(() => {
        if (event) {
            setFormData({
                name: event.name ?? "",
                description: event.description ?? "",
                date: event.date ?? "",
                location: event.location ?? "",
                address: event.address ?? "",
                price: event.price ?? 0,
                category: event.category ?? "",
                image: event.image ?? "",
                tags: event.tags ?? [],
                is_active: event.is_active ?? false,
                _id: event._id ?? undefined,
            });
        }
    }, [event]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, category: value }));
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setFormData(prev => ({ ...prev, is_active: checked }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const updatedTags = value.split(',').map(tag => tag.trim());
        setFormData(prev => ({ ...prev, tags: updatedTags }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const eventData: Event = {
            _id: formData._id ?? undefined,
            name: formData.name,
            description: formData.description,
            date: new Date(formData.date).toISOString(),
            location: formData.location,
            address: formData.address,
            price: formData.price,
            category: formData.category,
            image: formData.image,
            tags: formData.tags,
            is_active: formData.is_active,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        };

        onSave(eventData);
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">{event ? "Editar Evento" : "Nuevo Evento"}</h2>
                    <Button variant="ghost" size="icon" onClick={onCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Descripción</Label>
                        <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="date">Fecha</Label>
                        <Input
                            id="date"
                            name="date"
                            type="datetime-local"
                            value={formData.date}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="location">Ubicación</Label>
                        <Input id="location" name="location" value={formData.location} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="price">Precio</Label>

                        {/* Contenedor para los botones de precios predeterminados */}
                        <div className="flex space-x-2">
                            <Button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, price: 100 }))} // Precio predeterminado 1
                                variant="outline"
                            >
                                $100
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, price: 200 }))} // Precio predeterminado 2
                                variant="outline"
                            >
                                $200
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, price: 300 }))} // Precio predeterminado 3
                                variant="outline"
                            >
                                $300
                            </Button>
                            <Button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, price: 500 }))} // Precio predeterminado 4
                                variant="outline"
                            >
                                $500
                            </Button>
                        </div>

                        {/* Input para precio personalizado */}
                        <div className="mt-2">
                            <Input
                                id="price"
                                name="price"
                                type="text"
                                placeholder="Ingrese precio"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="category">Categoría</Label>
                        <Select key={formData.category} value={formData.category} onValueChange={handleSelectChange}>
                            <SelectTrigger>
                                <SelectValue placeholder={formData.category || "Selecciona una categoría"} />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="Conferencia">Conferencia</SelectItem>
                                <SelectItem value="Taller">Taller</SelectItem>
                                <SelectItem value="Concierto">Concierto</SelectItem>
                                <SelectItem value="Exposición">Exposición</SelectItem>
                                <SelectItem value="Festival">Festival</SelectItem>
                                <SelectItem value="Networking">Networking</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="image">URL de Imagen</Label>
                        <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="tags">Etiquetas (separadas por comas)</Label>
                        <Input id="tags" name="tags" value={formData.tags.join(', ')} onChange={handleTagsChange} />
                    </div>

                    <div className="flex items-center space-x-2">
                        <input
                            id="is_active"
                            type="checkbox"
                            checked={formData.is_active}
                            onChange={handleCheckboxChange}
                        />
                        <Label htmlFor="is_active">Activo</Label>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={onCancel}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700"
                        >
                            Guardar
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;