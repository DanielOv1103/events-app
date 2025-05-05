import { Event } from "@/type/events";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface FormProps {
    formData: Event;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    onTagsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onCategoryChange: (value: string) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export default function Form({
    formData,
    onChange,
    onTagsChange,
    onCheckboxChange,
    onCategoryChange,
    onSubmit
}: FormProps) {
    return (
        <form onSubmit={onSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow-md w-xl">
            <div>
                <Label>Nombre</Label>
                <Input
                    name="name"
                    value={formData?.name || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <Label>Descripción</Label>
                <Textarea
                    name="description"
                    value={formData?.description || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <Label>Fecha</Label>
                <Input
                    type="datetime-local"
                    name="date"
                    value={formData?.date || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <Label>Dirección</Label>
                <Input
                    name="address"
                    value={formData?.address || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <Label>Precio</Label>
                <Input
                    type="number"
                    name="price"
                    value={formData?.price || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
                <Label>Categoría</Label>
                <Select
                    value={formData?.category || undefined}
                    onValueChange={onCategoryChange}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecciona categoría" />
                    </SelectTrigger>
                    <SelectContent>
                        {["Conferencia", "Taller", "Concierto", "Exposición"].map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Imagen</Label>
                <Input
                    name="image"
                    value={formData?.image || ""}
                    onChange={onChange}
                    required
                />
            </div>
            <div>
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
