import AWS from 'aws-sdk';

const sns = new AWS.SNS();

export const handler = async (event) => {
    const { userEmail, notificationMessage, notificationSubject } = event;
    // const userTopicName = userEmail.replace(/[^\w\-]/g, '_'); // Sanitizing the email for topic name

    const baseTopicName = 'DHE-USER-';
    const userTopicName = `${baseTopicName}${userEmail.replace('@', '-').replace('.', '-')}`;

    const userName = userEmail.split('@')[0];

    const welcomeMessage = `Welcome to DalHousingEase, ${userName}! \n\n${notificationMessage}`;

    try {
        const currentTopics = await sns.listTopics().promise();
        const topicAlreadyExists = currentTopics.Topics.some(topic => topic.TopicArn.endsWith(userTopicName));

        if (topicAlreadyExists) {
            const topicArn = currentTopics.Topics.find(topic => topic.TopicArn.endsWith(userTopicName)).TopicArn;

            await sns.publish({
                Message: welcomeMessage,
                Subject: notificationSubject,
                TopicArn: topicArn,
            }).promise();

            return {
                statusCode: 200,
                status: "Success",
                message: "Notification sent successfully.",
            };
        } else {
            const createTopicResponse = await sns.createTopic({ Name: userTopicName }).promise();
            const topicArn = createTopicResponse.TopicArn;

            await sns.subscribe({
                Protocol: 'email',
                TopicArn: topicArn,
                Endpoint: userEmail,
            }).promise();

            return {
                statusCode: 200,
                status: "Success",
                message: "New topic created and user subscribed successfully.",
            };
        }
    } catch (error) {
        console.error('Error processing request:', error);
        return {
            statusCode: 500,
            status: "Failure",
            message: "An error occurred while processing the notification request.",
        };
    }
};
