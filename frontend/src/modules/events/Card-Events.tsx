import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Calendar,
    MapPin,
    Edit2,
    Trash2,
    Clock
} from "lucide-react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Event } from "@/type/events"
import ImageComponent from "@/components/imageComponent"
import { useDataHook } from "@/modules/events/hooks/useDataHook"

interface CardEventsProps {
    event: Event | null | undefined
    onEdit: () => void
    onDelete: (event: Event) => void
}

const CardEvents = ({ event, onDelete, onEdit }: CardEventsProps) => {
    if (!event) {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-6 text-center text-muted-foreground">
                    Evento no disponible
                </CardContent>
            </Card>
        )
    }

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString)
        return {
            date: date.toLocaleDateString("es-ES", {
                weekday: "short",
                day: "numeric",
                month: "short",
                year: "numeric",
            }),
            time: date.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
            }),
        }
    }

    const formattedDate = event.date ? formatDateTime(event.date) : null

    const { exhibitors } = useDataHook()

    const exhibitor = exhibitors.find(exhibitor => exhibitor._id === event.id_exhibitor[0])
    const exhibitorName = exhibitor ? exhibitor.name + " " + exhibitor.last_name : "Exhibidor no encontrado";

    return (
        <main className="flex flex-col md:flex-row transition-shadow duration-300 hover:shadow-lg group border-2 rounded-sm max-w-4xl w-full mx-auto">
            <div className="md:w-1/3 w-full h-full">
                <ImageComponent
                    image={event.image}
                    category={event.category}
                    name={event.name}
                />
            </div>
            <div className="md:w-2/3 w-full flex flex-col justify-between">
                <CardHeader className="pb-2 pt-4 px-6 space-y-2">
                    <h1 className="font-semibold">Datos del evento</h1>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 mr-2 text-violet-500" />
                        <span>{formattedDate?.date || "Fecha no definida"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-2 text-violet-500" />
                        <span>{formattedDate?.time || "--:--"} horas</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-violet-500" />
                        <span>{event.address || "Ubicación no especificada"}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 mr-2 text-violet-500" />
                        <span>{exhibitorName || "Ubicación no especificada"}</span>
                    </div>
                </CardHeader>

                <CardContent className="px-6 pb-2 pt-0">
                    <h2 className="text-sm font-semibold">Descipcion</h2>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                        {event.description}
                    </p>
                    {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                            {event.tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    className="text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                                >
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    )}
                </CardContent>

                <CardFooter className="justify-end gap-2 px-6 pb-4">
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-violet-500 hover:bg-violet-700 hover:text-white"
                        onClick={onEdit}
                    >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Editar
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 hover:bg-red-700 hover:text-white"
                        onClick={() => onDelete(event)}
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Eliminar
                    </Button>
                </CardFooter>
            </div>

        </main>
    )
}

export default CardEvents
