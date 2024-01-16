type Manufacturer = {
    name: "public.manufacturer",
    columns: {
        id: string,
        name: string
    }
}

type OffTheShelfPart = {
    name: "public.off_the_shelf_parts",
    columns: {
        id: string,
        type: string,
        manufacturer: string
    }
}

type SchemaPublic = {
    'public.manufacturer': Manufacturer,
    'public.off_the_shelf_parts': OffTheShelfPart
}