import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Edit2, Trash2, Clock, DollarSign } from "lucide-react"
import { Event } from '@/type/events'

interface CardEventsProps {
    event: Event | null | undefined
    // onEdit: () => void
    // onDelete: () => void
}

const CardEvents = ({ event}: CardEventsProps) => {
    if (!event) {
        return <div className="bg-white rounded-lg shadow p-4">Evento no disponible</div>;
    }

    // Formatear fecha y hora
    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return {
            date: date.toLocaleDateString('es-ES', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }),
            time: date.toLocaleTimeString('es-ES', {
                hour: '2-digit',
                minute: '2-digit'
            })
        };
    };

    const formattedDate = event.date ? formatDateTime(event.date) : null;

    return (
        <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg group border-none">
            <div className="h-48 bg-cover bg-center relative" style={{ backgroundImage: `url(${event.image})` }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 w-full">
                    <Badge className="mb-2 text-white bg-violet-600 hover:bg-violet-700 rounded-2xl">
                        {event.category}
                    </Badge>
                    <h3 className="text-xl font-bold text-white">{event.name}</h3>
                </div>
            </div>
            
            <CardContent className="pt-4">
                <div className="space-y-3">
                    {/* Fecha */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="h-4 w-4 mr-2 text-violet-500" />
                        <span>
                            {formattedDate ? formattedDate.date : 'Fecha no definida'}
                        </span>
                    </div>
                    
                    {/* Hora */}
                    <div className="flex items-center text-sm text-gray-500">
                        <Clock className="h-4 w-4 mr-2 text-violet-500" />
                        <span>
                            {formattedDate ? formattedDate.time : '--:--'} horas
                        </span>
                    </div>
                    
                    {/* Ubicación */}
                    <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="h-4 w-4 mr-2 text-violet-500" />
                        <span>
                            {/* {event.location || 'Ubicación no especificada'} */}
                            {event.address && ` (${event.address})`}
                        </span>
                    </div>
                    
                    {/* Descripción */}
                    <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                        {event.description}
                    </p>
                </div>
            </CardContent>

            {/* Tags y precio */}
            <CardFooter className="flex justify-between pt-0 pb-4">
                {event.tags && event.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
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
                
            </CardFooter>

            {/* Botones de edición y eliminación */}
            <CardFooter className="flex justify-between pt-0">
                <Button
                    variant="outline"
                    size="sm"
                    className="text-violet-500 hover:bg-violet-700 hover:text-white"
                    // onClick={onEdit}
                >
                    <Edit2 className="h-4 w-4 mr-2" />
                    Editar
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-700 hover:text-white"
                    // onClick={onDelete}
                >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar
                </Button>
            </CardFooter>
        </Card>
    )
}

export default CardEvents;