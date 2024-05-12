import { methods_req } from "../types";

const make_requests = async(route: string, method: keyof methods_req, data: BodyInit) =>{
    switch(method){
        case "get":
            const response_get = await fetch(`${import.meta.env.VITE_API_HOST}/${route}`, {
                method: method.toUpperCase(),
            });

            return response_get;
        case "post":
            const response_post = await fetch(`${import.meta.env.VITE_API_HOST}/${route}`, {
                method: method.toUpperCase(),
                body: data,
            });

            return response_post;
        
        case "patch":
            const response_patch = await fetch(`${import.meta.env.VITE_API_HOST}/${route}`, {
                method: method.toUpperCase(),
                body: data
            });

            return response_patch;

        case "delete":
            const response_delete = await fetch(`${import.meta.env.VITE_API_HOST}/${route}`, {
                method: method.toUpperCase()
            });

            return response_delete;
    }
}

const uploadFilesinServer = async(formada: any) =>{
    console.log(formada);
    
    const response = await make_requests(`upload`, "post", formada);

    return response;
}

export {uploadFilesinServer};