export { };
 
declare global {
    interface Window {
        objeto: any;
    }
    interface Event {
        request : any;
        respondWith: any;
        path: any;
    }
}