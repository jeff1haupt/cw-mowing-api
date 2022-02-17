module.exports = async function (context, req) {

    try {
        context.log('JavaScript HTTP trigger function processed a request.');

        // Read incoming data
        const cwWebHooksData = req.body;

        // fail if incoming data is required
        if (!cwWebHooksData) {

            context.res = {
                status: 400
            };
            return;
        }

        // Add or change code here
        const message = `The following data was received: ${cwWebHooksData}`; // Tugce's code could go here to parse the data

        // Construct response
        const responseJSON = {
            "received": cwWebHooksData,
            "message": message,
            "success": true
        }

        context.bindings.outputDocument = JSON.stringify({
            // create a random ID
            id: new Date().toISOString() + Math.random().toString().substr(2,8),
            data: cwWebHooksData
        });

        context.res = {
            // status: 200, /* Defaults to 200 */
            body: responseJSON,
            contentType: 'application/json'
        };
    } catch(err) {
        context.res = {
            status: 500
        };
    }
}