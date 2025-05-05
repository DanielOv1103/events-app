
import CardEvents from "./Card-Events"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDataHook } from './hooks/useDataHook'

const EventDashboard = () => {

    const { events, loading, error, refetch } = useDataHook()

    useEffect(() => {
        refetch()
    }, [])


    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Eventos Destacados</h1>
                <Link to="/events/create">
                    <Button
                        className="bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 transition-all text-white duration-300"
                    >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Nuevo Evento
                    </Button>
                </Link>
            </div>

            <hr className='mb-8 border-gray-200 border' />

            {loading ? (
                <p className="text-center">Cargando eventos...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {events.map(evt => (
                        <CardEvents
                            key={evt._id}
                            event={evt}
                        />
                    ))}
                </div>
            )}

            {error && (
                <div className="text-center text-red-500 mt-4">{error}</div>
            )}
        </div>
    )
}

export default EventDashboard
