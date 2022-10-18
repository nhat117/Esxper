import json
import os
import boto3

personalizeRt = boto3.client('personalize-runtime',
                             region_name=os.getenv('REGION'),
                             aws_access_key_id=os.getenv('API_KEY_ID'),
                             aws_secret_access_key=os.getenv('SECRET_ACCESS_KEY'))

GET_SIMS = "/getSims"
GET_PERSONALIZE = '/getPersonalize'
GET_RERANKING = '/getReranking'

def lambda_handler(event, context):
    try:
        if (event["rawPath"] == GET_SIMS):
            itemId = str(event["queryStringParameters"]["itemId"])
            num_results = int(event["queryStringParameters"]["numResults"])
            num_results = max(0, num_results)

            result = item_sims(itemId, num_results)
            # ======================================
            result = [str(x) for x in result]
            return {
                'statusCode': 200,
                'body': json.dumps(result)
            }

        elif (event["rawPath"] == GET_PERSONALIZE):
            userId = str(event["queryStringParameters"]["userId"])
            num_results = int(event["queryStringParameters"]["numResults"])
            num_results = max(0, num_results)
            result = user_personalize(userId, num_results)
            # ==========================================
            # result = random.choices(movide_ids, k=num_results)
            result = [str(x) for x in result]
            return {
                'statusCode': 200,
                'body': json.dumps(result)
            }

        elif (event["rawPath"] == GET_RERANKING):
            print("START USER ITEM====")
            userId = str(event["queryStringParameters"]["userId"])
            itemId = str(event["queryStringParameters"]["itemId"])
            num_results = int(event["queryStringParameters"]["numResults"])
            num_results = max(0, num_results)
            print("Got query====", userId, itemId, num_results)
            result = user_item_recommend(userId, itemId, num_results)
            # ==========================================
            # result = random.choices(movide_ids, k=num_results)
            result = [str(x) for x in result]
            return {
                'statusCode': 200,
                'body': json.dumps(result)
            }
    except:
        return {
            'statusCode': 422,
            'body': json.dumps('Missing query parameters')
        }

    return {
        'statusCode': 404,
        'body': json.dumps('Path does not exist')
    }


# get similar items for a given item
def item_sims(itemId, num_results=10):
    response = personalizeRt.get_recommendations(
        campaignArn = os.getenv('SIMS_ARN'),
        itemId = itemId,
        numResults = num_results
    )

    result = [item['itemId'] for item in response['itemList']]
    return result


# get item recommendations for a given user
def user_personalize(userId, num_results=10):
    response = personalizeRt.get_recommendations(
        campaignArn = os.getenv('PERSONALIZE_ARN'),
        userId = userId,
        numResults = num_results
    )

    result = [item['itemId'] for item in response['itemList']]
    return result


def rerank_items(userId, itemIds):
    response = personalizeRt.get_personalized_ranking(
        campaignArn = os.getenv('RERANKING_ARN'),
        inputList = itemIds,
        userId = userId
    )

    result = [item['itemId'] for item in response['personalizedRanking']]
    return result


# get item recommendations for a given user who is watching a particular item
def user_item_recommend(userId, itemId, num_results=10):
    print("START USER ITEM")
    initial_items = item_sims(itemId, num_results * 2)
    print("INIT ITEMS", initial_items)
    # reranking for this user
    result = rerank_items(userId, initial_items)
    print("Result", result)
    return result[:num_results]
