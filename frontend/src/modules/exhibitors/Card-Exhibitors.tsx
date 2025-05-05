import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Exhibitor } from "@/type/exhibitor";



interface CardExhibitorProps {
    exhibitor: Exhibitor; // Recibe el exhibidor como prop
    selectedExhibitor?: Exhibitor | null; // Recibe el exhibidor seleccionado como prop
    setSelectedExhibitor: (exhibitor: Exhibitor) => void;
}

export default function CardExhibitors({
    exhibitor,
    selectedExhibitor,
    setSelectedExhibitor,
}: CardExhibitorProps) {
    return (
        <div>
            <Card
                key={exhibitor.id}
                className={`transition-all duration-300 hover:shadow-lg ${selectedExhibitor?.id === exhibitor.id
                        ? "ring-2 ring-purple-500 dark:ring-purple-400 shadow-md transform scale-[1.02]"
                        : "hover:shadow-md"
                    }`}
                onClick={() => setSelectedExhibitor(exhibitor)}
            >
                <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                        <CardTitle>{exhibitor.name} {exhibitor.last_name}</CardTitle>
                    </div>
                    <CardDescription className="text-purple-600 dark:text-purple-400 font-medium">
                        {exhibitor.category_exhibitor}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                    <div className="flex items-start space-x-4">
                        <Avatar className="h-16 w-16 border-2 border-purple-200 dark:border-purple-800">
                            <AvatarImage src={exhibitor.image || "/placeholder.svg"} alt={exhibitor.name} />
                            <AvatarFallback>{exhibitor.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{exhibitor.bio}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
