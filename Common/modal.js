function getModal(bug_description, user_name, client_msg_id) {
    return {
        "title": {
            "type": "plain_text",
            "text": "Report a bug",
        },
        "submit": {
            "type": "plain_text",
            "text": "Submit"
        },
        "blocks": [
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "bug_description_id",
                    "initial_value": bug_description
                },
                "label": {
                    "type": "plain_text",
                    "text": "Bug Description",
                    "emoji": true
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "Pick a Severity"
                },
                "accessory": {
                    "type": "static_select",
                    "placeholder": {
                        "type": "plain_text",
                        "text": "Select an item",
                        "emoji": true
                    },
                    "options": [
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Severity 1",
                                "emoji": true
                            },
                            "value": "1"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Severity 2",
                                "emoji": true
                            },
                            "value": "2"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Severity 3",
                                "emoji": true
                            },
                            "value": "3"
                        },
                        {
                            "text": {
                                "type": "plain_text",
                                "text": "Severity 4",
                                "emoji": true
                            },
                            "value": "4"
                        }
                    ],
                    "action_id": "bug_severity_id",
                    "initial_option": {
                        "text": {
                            "type": "plain_text",
                            "text": "Severity 4",
                            "emoji": true
                        },
                        "value": "4"
                    }
                }
            },
            {
                "type": "input",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "user_name",
                    "initial_value": user_name
                },
                "label": {
                    "type": "plain_text",
                    "text": "Reported by:",
                    "emoji": true
                }
            },
            {
                "type": "input",
                "block_id": "client_msg_id",
                "element": {
                    "type": "plain_text_input",
                    "action_id": "client_msg_id",
                    "initial_value": client_msg_id
                },
                "label": {
                    "type": "plain_text",
                    "text": "Unique ID - Dont' change this",
                    "emoji": true
                }
            }
        ],
        "type": "modal"
    }
}

exports.getModal = getModal;