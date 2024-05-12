export type file = {
    extension: string,
    id: string,
    preview: {
        type: string
    },
    sizeReadable: string,
    lastModified: number,
    lastModifiedDate: Date,
    name: string,
    size: number,
    type: string
}

export type methods_req = {
    get: "GET",
    post: "POST",
    patch: "PATCH",
    put: "PUT",
    delete: "DELETE"
}

export type file_original = {
    fieldname: string,
    originalname: string,
    encoding: string,
    mimetype: string,
    destination: string,
    filename: string,
    path: string,
    size: number
}