const AWS = require('aws-sdk')
AWS.config.update({
    region:'ap-southeast-1',
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY
});

var personalizeevents = new AWS.PersonalizeEvents();

console.log('Loading function');

exports.handler = (event, context, callback) => {
    console.log(JSON.stringify(event, null, 2));
    
    event.Records.forEach(function(record) {
        var payload = Buffer.from(record.kinesis.data, 'base64').toString('ascii');
        console.log('Decoded payload:', payload);
        payload = JSON.parse(payload);
        var eventDate = new Date();
        var putEventsParams= {
            'sessionId': payload.SessionId, /* required */
            'trackingId': process.env.TRACKING_ID, /* required */
            'userId': payload.UserId,
            eventList: [
                {
                  'eventType': payload.EventType, /* required */
                  'itemId': payload.ItemId, /* required */
                  'sentAt': eventDate
                },
            ]
        }
        console.log("THIS IS THE OBJECT = " + JSON.stringify(putEventsParams,null,3))
        //Create a personalize event
        personalizeevents.putEvents(putEventsParams, function (err, data) {
          if (err) {
                console.log(err, err.stack); // an error occurred
          }
          else{     
                console.log(data);           // successful response
                putEventsParams['eventList'][0]['sentAt']=putEventsParams['eventList'][0]['sentAt'].toTimeString();
                const putEventsErrResponse = {
                    statusCode: 500,
                    body: JSON.stringify(err),
                };
                callback(null, putEventsErrResponse);
                const response = {
                    statusCode: 200,
                    body: JSON.stringify(putEventsParams),
                };
                callback(null, response);
          }
        });
    });
};

