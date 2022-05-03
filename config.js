module.exports = {
    expressPort: 443,
    testMode: false, 
    appURI: 'https://18.158.222.102/',


    vonage: {
        apiKey: '47494041',
        apiSecret: 'a4329feecc96afd8a243da5315d563f8536f3597'
    },

    genesysCloud: {
        // Genesys Cloud region
        // eg. 'mypurecloud.ie', 'euw2.pure.cloud', etc...
        region: 'mypurecloud.de',

        // Implicit Grant Client ID
        // Used by the web app itself in authorizing the Genesys Cloud agent
        implicitGrantID: '93eccc17-32e5-4356-b042-6b5c08fe1ebe',

        // Client Credentials OAuth
        // For authorizing the server app
        clientID: '78135749-9dd9-45a4-bd16-4698087d6d60',
        clientSecret: 'KnwGSQogCgcQvjqIY62Jgu86YU6oGSNS2tgcY58F0Tg',

        // Required when sending invitation through email, 
        // the outbound email will go through this ACD queue. 
        emailQueueID: '',

        // Required when sending invitation through SMS
        // This number should be purchased by the Genesys Cloud organization.
        smsFromAddress: '+447723578314', // eg +13175550000
    }
}
