import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Person } from '../../type/person'

interface PersonFormProps {
    person?: Person | null;
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: (userData: Person) => void;
    isCreating?: boolean;
}

export default function PersonForm({
    person = null,
    isOpen = false,
    onClose,
    onSubmit,
    isCreating = false
}: PersonFormProps) {
    const [formData, setFormData] = useState<Person>({
        name: person?.name || "",
        last_name: person?.last_name || "",
        email: person?.email || "",
        phone: person?.phone || "",
        address: person?.address || "",
        city: person?.city || "",
        country: person?.country || "",
        id: person?.id || "", // Cambié esto a cadena vacía si person es null
        created_at: person?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
    })

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
            updated_at: new Date().toISOString()
        }))
    }

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, '').slice(0, 9)
        setFormData(prev => ({
            ...prev,
            phone: value,
            updated_at: new Date().toISOString()
        }))
    }

    const handleSelectChange = (name: keyof Person, value: string) => {
        setFormData(prev => ({ 
            ...prev, 
            [name]: value,
            updated_at: new Date().toISOString()
        }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleCancel = () => {
        onClose()
    }

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">
                        {person ? "Editar Usuario" : "Nuevo Usuario"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="name">Nombre</Label>
                        <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="last_name">Apellido</Label>
                        <Input
                            id="last_name"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            maxLength={9}
                            placeholder="123456789"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="city">Ciudad</Label>
                        <Input
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select 
                            value={formData.country} 
                            onValueChange={(value) => handleSelectChange('country', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Selecciona un país" />
                            </SelectTrigger>
                            <SelectContent className="bg-white">
                                <SelectItem value="España">España</SelectItem>
                                <SelectItem value="México">México</SelectItem>
                                <SelectItem value="Argentina">Argentina</SelectItem>
                                <SelectItem value="Colombia">Colombia</SelectItem>
                                <SelectItem value="Chile">Chile</SelectItem>
                                <SelectItem value="Perú">Perú</SelectItem>
                                <SelectItem value="Estados Unidos">Estados Unidos</SelectItem>
                                <SelectItem value="Otro">Otro</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                        >
                            {isCreating ? "Crear Usuario" : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}