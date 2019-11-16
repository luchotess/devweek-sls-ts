export class Middleware {
    private parse_body(event: any) {
        if (event.body) {
            return JSON.parse(event.body);
        }
        return {}
    }

    async run(event: any, context:any, ...args) {
        event.body = this.parse_body(event);
        event.params = Object.assign( {}, event.queryStringParameters);
        if(event.pathParameters){
            event.params = Object.assign( event.pathParameters, event.params);
        }

        return {
            event,
            context
        };
    }
}
