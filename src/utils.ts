const defaultCode = 200;

const defaultHeaders = {
    'Access-Control-Allow-Origin'     : '*',
    'Access-Control-Allow-Credentials': true
};

export function HttpSucceed (body = {}, statusCode = defaultCode, headers = defaultHeaders) {
    return {
        statusCode,
        headers,
        body: JSON.stringify(body)
    };
}
