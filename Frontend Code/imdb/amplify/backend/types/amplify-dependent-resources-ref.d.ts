export type AmplifyDependentResourcesAttributes = {
    auth: {
        exsperPoolWithAnalytics: {
            IdentityPoolId: "string";
            IdentityPoolName: "string";
            UserPoolId: "string";
            UserPoolArn: "string";
            UserPoolName: "string";
            AppClientIDWeb: "string";
            AppClientID: "string";
            CreatedSNSRole: "string";
        };
    };
    function: {
        ExsperAmplifyPresignupAutoconfirm: {
            Name: "string";
            Arn: "string";
            Region: "string";
            LambdaExecutionRole: "string";
        };
    };
    analytics: {
        amplifyAnalyticsExsper: {
            kinesisStreamArn: "string";
            kinesisStreamId: "string";
            kinesisStreamShardCount: "string";
        };
    };
};
