const SlackService = require('./Services/SlackService');

exports.handler = async (event, context) => {
    const payload = decodeURIComponent(event.body.replace('payload=', ''));
    const parsedBody = JSON.parse(payload);
    console.log('Parsed body:', parsedBody);
    const triggerId = parsedBody.trigger_id;
    const type = parsedBody.type;
    const user_id = parsedBody.user.id;
    console.log("user id:", user_id);

    let returnResponse = {
        statusCode: 200,
        body: "",
    };;

    switch (type) {
        case 'message_action':
            console.log('Message action');
            const message = decodeURIComponent(parsedBody.message.text);
            const replacedString = message.replace(/\+/g, ' ');
            const client_msg_id = parsedBody.message.ts;
            await SlackService.showModal(triggerId, replacedString, user_id, client_msg_id);
            returnResponse = {
                statusCode: 200,
                body: "",
            }
            break;
        case 'view_submission':
            returnResponse = await SlackService.handleSubmission(parsedBody);
            break;
    }
    return returnResponse;
}