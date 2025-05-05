import { Event } from "@/type/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useDataHook } from "./hooks/useDataHook"
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react"; // Icono para cerrar


interface FormProps {
    formData: Event;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
    onDistributionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onExhibitorRemove: (id: string) => void;
}

export default function Form({
    formData,
    onChange,
    onTagsChange,
    onCheckboxChange,
    onCategoryChange,
    onSubmit,
    onDistributionChange,
    onExhibitorRemove
}: FormProps) {

    const { exhibitors, loading, error } = useDataHook()

    if (loading) return <p>Cargando expositores...</p>;
    if (error) return <p>Error al cargar expositores: {error}</p>;

    const exhibitorsOptions = exhibitors.map(exhibitor => ({
        id: exhibitor._id,
        name: exhibitor.name,
        category: exhibitor.category_exhibitor,
        bio: exhibitor.bio,
        image: exhibitor.image,
    }))

    const handleRemoveExhibitor = (id: string) => {
        onExhibitorRemove(id); // Usamos la función pasada desde el padre
    };

    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md">
            <main className="flex space-x-4 w-full">
                <div className="space-y-4 w-full">
                    <div className="space-y-2">
                        <Label>Nombre</Label>
                        <Input
                            name="name"
                            value={formData?.name || ""}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Descripción</Label>
                        <Textarea
                            name="description"
                            value={formData?.description || ""}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Fecha</Label>
                        <Input
                            type="datetime-local"
                            name="date"
                            value={formData?.date || ""}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Dirección</Label>
                        <Input
                            name="address"
                            value={formData?.address || ""}
                            onChange={onChange}
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Categoría</Label>
                        <Select
                            value={formData?.category || undefined}
                            onValueChange={onCategoryChange}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona categoría" />
                            </SelectTrigger>
                            <SelectContent>
                                {["Conferencia", "Taller", "Concierto", "Exposición"].map(cat => (
                                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label>Imagen</Label>
                        <Input
                            name="image"
                            value={formData?.image || ""}
                            onChange={onChange}
                            required
                        />
                    </div>
                </div>
                <div className="space-y-4 w-full">
                    <div className="space-y-2">
                        <Label>Expositores</Label>

                        {/* Badges */}
                        <div className="flex flex-wrap gap-2">
                            {formData.id_exhibitor?.length === 0 ? (
                                <p className="text-gray-500">No hay expositores seleccionados</p>
                            ) : (
                                formData.id_exhibitor.map((id) => {
                                    const exhibitor = exhibitorsOptions.find((ex) => ex.id === id);
                                    return (
                                        <div
                                            key={id}
                                            className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                                        >
                                            <span className="mr-2">{exhibitor?.name || id}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveExhibitor(id)}
                                                className="text-blue-600 hover:text-blue-800 font-bold"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    );
                                })
                            )}
                        </div>

                    </div>
                    <div className="space-y-2">
                        <Label>Distribuciones</Label>
                        <div className="space-y-4 border-2 rounded-sm border-gray-100 p-4">
                            <div className="space-y-2">
                                <Label>General</Label>
                                <div className="flex space-x-4">
                                    <Input
                                        name="General-price"
                                        placeholder="Precio"
                                        value={formData.distribution.find(d => d.name === "General")?.price ?? ""}
                                        onChange={onDistributionChange}
                                    />
                                    <div className="border-r-2 border-gray-100"></div>
                                    <Input
                                        name="General-capacity"
                                        placeholder="Capacidad"
                                        value={formData.distribution.find(d => d.name === "General")?.capacity ?? ""}
                                        onChange={onDistributionChange}
                                    />

                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-2">
                                <Label>Golden</Label>
                                <div className="flex space-x-4">
                                    <Input
                                        name="Golden-price"
                                        placeholder="Precio"
                                        value={formData?.distribution?.find(d => d.name === "Golden")?.price ?? ""}
                                        onChange={onDistributionChange}
                                        type="number"
                                    />
                                    <div className="border-r-2 border-gray-100"></div>
                                    <Input
                                        name="Golden-capacity"
                                        placeholder="Capacidad"
                                        value={formData?.distribution?.find(d => d.name === "Golden")?.capacity ?? ""}
                                        onChange={onDistributionChange}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-2">
                                <Label>Vip</Label>
                                <div className="flex space-x-4">
                                    <Input
                                        name="Vip-price"
                                        placeholder="Precio"
                                        value={formData?.distribution?.find(d => d.name === "Vip")?.price ?? ""}
                                        onChange={onDistributionChange}
                                        type="number"
                                    />
                                    <div className="border-r-2 border-gray-100"></div>
                                    <Input
                                        name="Vip-capacity"
                                        placeholder="Capacidad"
                                        value={formData?.distribution?.find(d => d.name === "Vip")?.capacity ?? ""}
                                        onChange={onDistributionChange}
                                        type="number"
                                    />
                                </div>
                            </div>
                            <Separator className="my-4" />
                            <div className="space-y-2">
                                <Label>Platinium</Label>
                                <div className="flex space-x-4">
                                    <Input
                                        name="Platinium-price"
                                        placeholder="Precio"
                                        type="number"
                                        value={formData?.distribution?.find(d => d.name === "Platinium")?.price ?? ""}
                                        onChange={onDistributionChange}
                                    />
                                    <div className="border-r-2 border-gray-100"></div>
                                    <Input
                                        name="Platinium-capacity"
                                        placeholder="Capacidad"
                                        value={formData?.distribution?.find(d => d.name === "Platinium")?.capacity ?? ""}
                                        onChange={onDistributionChange}
                                        type="number"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <div className="space-y-2">
                <Label>Etiquetas (separadas por comas)</Label>
                <Input
                    name="tags"
                    value={formData?.tags?.join(', ') || ""}
                    onChange={onTagsChange}
                />
            </div>
            <div className="flex gap-2 items-center">
                <input
                    type="checkbox"
                    checked={formData?.is_active || false}
                    onChange={onCheckboxChange}
                />
                <Label>Activo</Label>
            </div>
            <Button type="submit" className="w-full">Guardar</Button>
        </form>
    );
}
