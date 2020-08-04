import Controller from "./Controller";

const Hello: Controller = {
    method: 'get',
    path: '/hello',
    cb: (request, response) => {
        console.log("❇️ Received GET request to " + this.path);
        response.send("hello world");
    }
};

export default Hello;