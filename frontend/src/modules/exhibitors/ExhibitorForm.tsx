import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Exhibitor } from "@/type/exhibitor"
import { Textarea } from "@/components/ui/textarea" // Asegúrate de tener este componente para bio

interface ExhibitorFormProps {
    exhibitor?: Exhibitor | null;
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: (userData: Exhibitor) => void;
    isCreating?: boolean;
}

export default function ExhibitorForm({
    exhibitor = null,
    isOpen = false,
    onClose,
    onSubmit,
    isCreating = false
}: ExhibitorFormProps) {
    const [formData, setFormData] = useState<Exhibitor>({
        _id: exhibitor?._id || "",
        name: exhibitor?.name || "",
        last_name: exhibitor?.last_name || "",
        email: exhibitor?.email || "",
        bio: exhibitor?.bio || "",
        category_exhibitor: exhibitor?.category_exhibitor || "",
        phone: exhibitor?.phone || "",
        address: exhibitor?.address || "",
        city: exhibitor?.city || "",
        country: exhibitor?.country || "",
        image: exhibitor?.image || "",
        created_at: exhibitor?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString()
    })

    if (!isOpen) return null

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value,
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

    const handleSelectChange = (name: keyof Exhibitor, value: string) => {
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
                        {exhibitor ? "Editar Expositor" : "Nuevo Expositor"}
                    </h2>
                    <Button variant="ghost" size="icon" onClick={handleCancel}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    <div className="flex space-x-2">

                        <div className="space-y-2 w-full">
                            <Label htmlFor="name">Nombre</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="last_name">Apellido</Label>
                            <Input id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} required />
                        </div>
                    </div>
                    <div className="flex space-x-2">

                        <div className="space-y-2 w-full">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="phone">Teléfono</Label>
                            <Input id="phone" name="phone" value={formData.phone} onChange={handlePhoneChange} maxLength={9} required />
                        </div>
                    </div>

                    <div className="flex space-x-2">

                        <div className="space-y-2 w-full">
                            <Label htmlFor="address">Dirección</Label>
                            <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="city">Ciudad</Label>
                            <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                        </div>

                    </div>

                    <div className="flex space-x-2">

                        <div className="space-y-2 w-full">
                            <Label htmlFor="bio">Biografía</Label>
                            <Textarea  className="max-h-20 max-w-52 overflow-y-auto resize-y" id="bio" name="bio" value={formData.bio} onChange={handleChange} required />
                        </div>

                        <div className="space-y-2 w-full">
                            <Label htmlFor="category_exhibitor">Categoría</Label>
                            <Select value={formData.category_exhibitor} onValueChange={(value) => handleSelectChange('category_exhibitor', value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue className="w-full" placeholder="Selecciona una categoría" />
                                </SelectTrigger>
                                <SelectContent className="bg-white w-full">
                                    <SelectItem className="w-full" value="Tecnología">Tecnología</SelectItem>
                                    <SelectItem value="Educación">Educación</SelectItem>
                                    <SelectItem value="Salud">Salud</SelectItem>
                                    <SelectItem value="Arte">Arte</SelectItem>
                                    <SelectItem value="Otro">Otro</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="country">País</Label>
                        <Select value={formData.country} onValueChange={(value) => handleSelectChange('country', value)}>
                            <SelectTrigger className="w-full">
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


                    <div className="space-y-2">
                        <Label htmlFor="image">Imagen</Label>
                        <Input id="image" name="image" value={formData.image} onChange={handleChange} required />
                    </div>


                    <div className="flex justify-end space-x-2 pt-2">
                        <Button type="button" variant="outline" onClick={handleCancel}>
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            className="bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700"
                        >
                            {isCreating ? "Crear Expositor" : "Guardar Cambios"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
