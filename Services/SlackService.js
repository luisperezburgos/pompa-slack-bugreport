const { WebClient } = require('@slack/web-api');
const SLACK_BOT_TOKEN = process.env.SLACK_BOT_TOKEN;
const web = new WebClient(SLACK_BOT_TOKEN);
const modal = require('../Common/modal');
const ClickUp = require('./ClickUp');

async function showModal(triggerId, description, user_id, client_msg_id) {
    const user = await getUserInfo(user_id);
    console.log("User:", user);
    const userReportedName = user.profile.real_name;
    const result = await web.views.open({
        trigger_id: triggerId,
        view: modal.getModal(description, userReportedName, client_msg_id)
    });
    console.log("Result:", result);
}

async function handleSubmission(body){
    const blocks = body.view.state.values;
    console.log("blocks:", blocks);
    const bugDescription = decodeURIComponent(Object.values(blocks)[0].bug_description_id.value.replace(/\+/g, ' '));
    const severity = Object.values(blocks)[1].bug_severity_id.selected_option.value;
    const userReportedId = decodeURIComponent(Object.values(blocks)[2].user_name.value.replace(/\+/g, ' '));
    const client_msg_id = Object.values(blocks)[3].client_msg_id.value;
    const clickUpUrl = await ClickUp.createTask(userReportedId + " - Reported Bug", bugDescription, severity);
    console.log("Bug Description:", bugDescription);
    console.log("Severity:", severity);
    console.log("User Reported:", userReportedId);
    console.log("client_msg_id:", client_msg_id);
    let returnResponse;
    try {
        const result = await web.chat.postMessage({
            token: process.env.SLACK_BOT_TOKEN,
            channel: body.user.id,
            text: 'Thanks for submitting a bug report, here is the link to the ClickUp task: ' + clickUpUrl,
            thread_ts: client_msg_id
        });
        console.log('Message sent: ', result.ts);
        returnResponse = {
            statusCode: 200,
            body: "",
        };
    } catch (error) {
        console.error(error);
    }
    return returnResponse;
}

async function getUserInfo(userId) {
    try {
        const result = await web.users.info({
            user: userId
        });
        return result.user;
    } catch (error) {
        console.error(error);
    }
}



exports.showModal = showModal;
exports.handleSubmission = handleSubmission;