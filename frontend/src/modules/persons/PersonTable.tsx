import { Edit2, MoreHorizontal } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Person } from "@/type/person"

interface PersonTableProps {
    data?: Person[];
    onSelect?: (id: string) => void;
    onSelectAll?: (checked: boolean) => void;
    onEdit?: (item: Person) => void;
    onDelete?: (item: Person) => void;
    selectedItems?: string[];
    showCheckbox?: boolean;
    showActions?: boolean;
    emptyMessage?: string;
}

const PersonTable = ({
    data = [],
    onSelect,
    onSelectAll,
    onEdit,
    onDelete,
    selectedItems = [],
    showCheckbox = true,
    showActions = true,
    emptyMessage = "No se encontraron datos."
}: PersonTableProps) => {
    // Function to get initials
    const getInitials = (name: string, lastName: string) => {
        if (!name && !lastName) return "NN"
        return `${name?.[0] || ''}${lastName?.[0] || ''}`.toUpperCase()
    }

    return (
        <div className="rounded-md border border-gray-100 p-4">
            <Table>
                <TableHeader>
                    <TableRow>
                        {showCheckbox && (
                            <TableHead className="w-12">
                                <Checkbox
                                    checked={data.length > 0 && selectedItems.length === data.length}
                                    onCheckedChange={onSelectAll}
                                    aria-label="Seleccionar todos"
                                />
                            </TableHead>
                        )}

                        <TableHead>Persona</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Dirección</TableHead>
                        <TableHead>Ciudad</TableHead>
                        <TableHead>País</TableHead>

                        {showActions && <TableHead className="text-right">Acciones</TableHead>}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell
                                colSpan={6 + (showCheckbox ? 1 : 0) + (showActions ? 1 : 0)}
                                className="h-24 text-center"
                            >
                                {emptyMessage}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((person) => (
                            <TableRow key={person.id} className="group">
                                {showCheckbox && (
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedItems.includes(person.id)}
                                            onCheckedChange={() => onSelect?.(person.id)}
                                            aria-label={`Seleccionar ${person.name}`}
                                        />
                                    </TableCell>
                                )}

                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-8 w-8 border border-gray-200">
                                            <AvatarFallback>
                                                {getInitials(person.name, person.last_name)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="font-medium">{person.name} {person.last_name}</div>
                                        </div>
                                    </div>
                                </TableCell>

                                <TableCell>{person.email}</TableCell>
                                <TableCell>{person.phone}</TableCell>
                                <TableCell>{person.address}</TableCell>
                                <TableCell>{person.city}</TableCell>
                                <TableCell>{person.country}</TableCell>

                                {showActions && (
                                    <TableCell className="text-right">
                                        <div className="flex justify-end">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() => onEdit?.(person)}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <Edit2 className="h-4 w-4" />
                                                <span className="sr-only">Editar</span>
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="h-4 w-4" />
                                                        <span className="sr-only">Abrir menú</span>
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => onEdit?.(person)}>
                                                        Editar
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        className="text-red-600"
                                                        onClick={() => onDelete?.(person)}
                                                    >
                                                        Eliminar
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                    </TableCell>
                                )}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default PersonTable