
var platformClient = require('purecloud-platform-client-v2');
var WebSocket = require('ws');

if (process.argv.length != 6) {
    console.error("Usage: node transcription.js <environment> <clientId> <clientSecret> <conversationid>");
    console.error("Example: node transcription.js mypurecloud.de qwertyui-opas-dfgh-jklz-xcvbnm123456 qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJ qwertyui-opas-dfgh-jklz-xcvbnm654321");
    
}

try {

    var client = platformClient.ApiClient.instance;
    client.setEnvironment(process.argv[2]);

    client.loginClientCredentialsGrant(process.argv[3], process.argv[4])
        .then(function () {
            console.log("Logged in");


            let notificationsApi = new platformClient.NotificationsApi();

            notificationsApi.postNotificationsChannels()
                .then(function (result) {

                    console.log(`postNotificationsChannels success! data: ${JSON.stringify(result, null, 2)}`);

                    notificationsApi.putNotificationsChannelSubscriptions(result.id, [{ "id": `v2.conversations.${process.argv[5]}.transcription` }])
                        .then(function () {

                            console.log(`putNotificationsChannelSubscriptions success!`);

                            var webSocket = new WebSocket(result.connectUri);


                            // Open websocket and "listen" to the conversation
                            webSocket.onopen = function () {
                                // websocket is opened
                                console.log("WebSocket connection is opened: " + result.connectUri);
                            };

                            webSocket.onmessage = function (message) {
                                var eventMessage = JSON.parse(message.data);

                                if (eventMessage.eventBody.hasOwnProperty(`transcripts`))
                                    for (let i = 0; i < eventMessage.eventBody.transcripts.length; i++)
                                        console.log(`${eventMessage.eventBody.transcripts[i].channel}: ${eventMessage.eventBody.transcripts[i].alternatives[0].transcript}`);
                                console.log(`#########################################################################################################################`);

                            };

                            webSocket.onclose = function () {
                                // websocket is closed
                                console.log("Connection is closed...");
                            };

                        })
                        .catch(function (err) {
                            console.log(`There was a failure calling putNotificationsChannelSubscriptions ${err}`);

                        });
                })
                .catch(function (err) {
                    console.log('There was a failure calling postNotificationsChannels');
                });





        })
        .catch(function (err) {
            console.log('There was a failure calling loginClientCredentialsGrant');
        });
}
catch (error) {
    console.log("There was a failure calling getStarted ");
}