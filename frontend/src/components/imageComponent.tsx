import { Badge } from "./ui/badge";

interface ImageComponentProps {
    image?: string;
    category?: string;
    name?: string;
    width?: string;
    height?: string;
}

export default function ImageComponent({
    image,
    category,
    name,
}: ImageComponentProps) {
    return (
        <div className={`relative overflow-hidden w-full h-full rounded-sm`}>
            {image && (
                <img
                    src={image}
                    alt={name ?? "imagen"}
                    className="object-cover w-full h-full"
                />
            )}

            {/* Degradado visible siempre */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

            {/* Contenido inferior */}
            <div className="absolute bottom-0 left-0 p-4 w-full">
                {category && (
                    <Badge className="mb-2 text-white bg-violet-600 hover:bg-violet-700 rounded-2xl">
                        {category}
                    </Badge>
                )}
                {name && <h3 className="text-xl font-bold text-white">{name}</h3>}
            </div>
        </div>
    );
}
