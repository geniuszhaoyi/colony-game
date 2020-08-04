
export default interface Controller {
    method: string;
    path: string;
    cb: (request, response) => void;
    [propName: string]: any
}