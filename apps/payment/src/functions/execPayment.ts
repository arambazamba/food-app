import { app, HttpRequest, HttpResponseInit, InvocationContext } from "@azure/functions";

export async function execPayment(request: HttpRequest, context: InvocationContext): Promise<HttpResponseInit> {
    context.log('Executing payment');
    const responseMessage = { "paymentRequest": "pending", "transactionID": '0284e06a-47f3-42cb-85a8-ae2fa0075132' }
    return { jsonBody: responseMessage };
};

app.http('execPayment', {
    methods: ['GET', 'POST'],
    authLevel: 'anonymous',
    handler: execPayment
});
