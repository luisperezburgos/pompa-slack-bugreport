const axios = require('axios');
async function createTask(name, description, priority) {
    const query = new URLSearchParams({
        custom_task_ids: 'true',
        team_id: '90100114831'
    }).toString();

    const now = new Date();
    const nowTimestamp = now.getTime();
    const threeDaysFromNow = new Date(now.getTime() + (3 * 24 * 60 * 60 * 1000));
    const timestampThreeDaysFromNow = threeDaysFromNow.getTime();

    const listId = '901000657707';
    const resp = await fetch(
        `https://api.clickup.com/api/v2/list/${listId}/task?${query}`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: process.env.CLICKUP_API_KEY
            },
            body: JSON.stringify({
                name: name,
                description: description,
                assignees: [38333635],
                tags: ['Slack, Bug Report'],
                status: 'New',
                priority: priority,
                due_date: timestampThreeDaysFromNow,
                due_date_time: false,
                time_estimate: 8640000,
                start_date: nowTimestamp,
                start_date_time: false,
                notify_all: true,
                parent: null,
            })
        }
    );

    const data = await resp.json();
    return data.url;
}

exports.createTask = createTask;