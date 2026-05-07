import { AxiosInstance } from "axios";

// const api = new API(...)
class API {
    axiosInstance: AxiosInstance

    constructor(axiosInstance: AxiosInstance) {
        this.axiosInstance = axiosInstance
    }

    // log(path: string, response: any) {
    //     console.log(response.data)
    // }

    // logError(path: string, error: any) {
    //     console.error("Error details: ", {
    //         path: path,
    //         message: error?.message,
    //         response: error?.response,
    //     });
    // }
    
    async create (path: string, request: Object) {
        try {
            const {data} = await this.axiosInstance.post(path);
            // this.log(path, data)
            return data;
        }
        catch (error: any) {
            // this.logError(path, error)
        }
    }
}


export default (axiosInstance: AxiosInstance) => new API(axiosInstance);