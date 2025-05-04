import { useEffect, useState } from "react"
import ExhibitorTable from "./ExhibitorTable"
import ExhibitorForm from "./ExhibitorForm"
import {
    createExhibitor,
    deleteExhibitor,
    getExhibitors,
    updateExhibitor
} from "@/api/exhibitorServices"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Exhibitor } from "@/type/exhibitor"

export default function ExhibitorComponent() {
    const [exhibitors, setExhibitors] = useState<Exhibitor[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [currentExhibitor, setCurrentExhibitor] = useState<Exhibitor | null>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [selectedExhibitors, setSelectedExhibitors] = useState<string[]>([])

    const fetchExhibitors = async () => {
        setLoading(true)
        try {
            const response = await getExhibitors()
            setExhibitors(response)
            setError(null)
        } catch (err) {
            console.error("Error fetching exhibitors:", err)
            setError("Error al cargar expositores")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchExhibitors()
    }, [])

    const handleOpenCreateForm = () => {
        setCurrentExhibitor(null)
        setIsCreating(true)
        setIsFormOpen(true)
    }

    const handleEdit = (exhibitor: Exhibitor) => {
        setCurrentExhibitor(exhibitor)
        setIsCreating(false)
        setIsFormOpen(true)
    }

    const handleDelete = async (exhibitor: Exhibitor) => {
        try {
            await deleteExhibitor(exhibitor.id)
            setSuccess("Expositor eliminado correctamente")
            await fetchExhibitors()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido")
        }
    }

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedExhibitors.map(id => deleteExhibitor(id)))
            setSuccess(`${selectedExhibitors.length} expositores eliminados correctamente`)
            setSelectedExhibitors([])
            await fetchExhibitors()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido")
        }
    }

    const handleSelect = (id: string) => {
        setSelectedExhibitors(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        setSelectedExhibitors(prev =>
            prev.length === exhibitors.length
                ? []
                : exhibitors.map(exhibitor => exhibitor.id)
        )
    }

    const handleSaveExhibitor = async (exhibitorData: Exhibitor) => {
        try {
            if (isCreating) {
                await createExhibitor(exhibitorData)
                setSuccess("Expositor creado correctamente")
            } else {
                await updateExhibitor(exhibitorData.id, exhibitorData)
                setSuccess("Expositor actualizado correctamente")
            }
            setIsFormOpen(false)
            await fetchExhibitors()
        } catch (err) {
            setError(err instanceof Error ? err.message : "Error desconocido")
        }
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Expositores</h1>
                <Button onClick={handleOpenCreateForm}>Crear Nuevo Expositor</Button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>
            )}

            {success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">{success}</div>
            )}

            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
                    disabled={selectedExhibitors.length === 0}
                    className="text-red-700 gap-2"
                >
                    <Trash2 className="h-4 w-4" />
                    Eliminar Seleccionados
                </Button>
            </div>

            <ExhibitorTable
                data={exhibitors}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectedItems={selectedExhibitors}
                showCheckbox={true}
                showActions={true}
                emptyMessage="No hay expositores registrados"
            />

            {isFormOpen && (
                <ExhibitorForm
                    exhibitor={currentExhibitor}
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSaveExhibitor}
                    isCreating={isCreating}
                />
            )}
        </div>
    )
}