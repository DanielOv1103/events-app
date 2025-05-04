import { useEffect, useState } from "react"
import PersonTable from "./PersonTable"
import PersonForm from "./PersonForm"
import { createPerson, deletePerson, getPersons, updatePerson } from "@/api/personServices"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { Person } from "@/type/person"

export default function PersonsComponent() {
    const [persons, setPersons] = useState<Person[]>([])
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [currentPerson, setCurrentPerson] = useState<Person | null>(null)
    const [isFormOpen, setIsFormOpen] = useState<boolean>(false)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [selectedPersons, setSelectedPersons] = useState<string[]>([])

    // Fetch persons
    const fetchPersons = async () => {
        setLoading(true)
        try {
            const response = await getPersons()
            setPersons(response)
            console.log(response)
            setError(null)
        } catch (err) {
            console.error('Error fetching persons:', err)
            setError('Error al cargar personas')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPersons()
    }, [])

    // Format person data for the table
    const formattedPersons = persons.map(person => ({
        ...person,
        id: person.id || '',
    }))

    const handleOpenCreateForm = () => {
        setCurrentPerson(null)
        setIsCreating(true)
        setIsFormOpen(true)
    }

    const handleEdit = (person: Person) => {
        setCurrentPerson(person)
        setIsCreating(false)
        setIsFormOpen(true)
    }

    const handleDelete = async (person: Person) => {
        try {
            await deletePerson(person.id || '')
            setSuccess('Persona eliminada correctamente')
            await fetchPersons()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        }
    }

    const handleDeleteSelected = async () => {
        try {
            await Promise.all(selectedPersons.map(id => deletePerson(id)))
            setSuccess(`${selectedPersons.length} personas eliminadas correctamente`)
            setSelectedPersons([])
            await fetchPersons()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        }
    }

    const handleSelect = (id: string) => {
        setSelectedPersons(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }

    const handleSelectAll = () => {
        setSelectedPersons(prev =>
            prev.length === formattedPersons.length
                ? []
                : formattedPersons.map(person => person.id || '')
        )
    }

    const handleSavePerson = async (personData: Person) => {
        try {
            if (isCreating) {
                await createPerson(personData)
                setSuccess('Persona creada correctamente')
                await fetchPersons()
            } else {
                await updatePerson(personData.id || '', personData)
                setSuccess('Persona actualizada correctamente')
            }
            setIsFormOpen(false)
            await fetchPersons()
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Error desconocido')
        }
    }

    return (
        <div className="space-y-4 p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Gestión de Personas</h1>
                <Button onClick={handleOpenCreateForm}>
                    Crear Nueva Persona
                </Button>
            </div>

            {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                    {error}
                </div>
            )}

            {success && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                    {success}
                </div>
            )}

            <div className="flex items-center justify-end gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDeleteSelected}
                    disabled={selectedPersons.length === 0}
                    className="text-red-700 gap-2"
                >
                    <Trash2 className="h-4 w-4" />
                    Eliminar Seleccionados
                </Button>
            </div>

            <PersonTable
                data={formattedPersons}
                onSelect={handleSelect}
                onSelectAll={handleSelectAll}
                onEdit={handleEdit}
                onDelete={handleDelete}
                selectedItems={selectedPersons}
                showCheckbox={true}
                showActions={true}
                emptyMessage="No hay personas registradas"
            />

            {isFormOpen && (
                <PersonForm
                    person={currentPerson}
                    isOpen={isFormOpen}
                    onClose={() => setIsFormOpen(false)}
                    onSubmit={handleSavePerson}
                    isCreating={isCreating}
                />
            )}
        </div>
    )
}