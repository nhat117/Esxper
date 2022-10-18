const AWS = require("aws-sdk")
const https = require('https');

const dynamo = new AWS.DynamoDB.DocumentClient();

const API_KEY = '?api_key=ac66b50ce17f22945324ede476f55412';
const BASE_URL = 'https://api.themoviedb.org/3';

function getRequest(request) {
    const url = BASE_URL + request;

    return new Promise((resolve, reject) => {
        const req = https.get(url, res => {
            let rawData = '';

            res.on('data', chunk => {
                rawData += chunk;
            });

            res.on('end', () => {
                try {
                    resolve(JSON.parse(rawData));
                }
                catch (err) {
                    reject(new Error(err));
                }
            });
        });

        req.on('error', err => {
            reject(new Error(err));
        });
    });
}

exports.handler = async (event) => {
    let resource = event.httpMethod + " " + event.resource;

    try {
        //Get all movies in database
        if (resource === "GET /movies") {
            let res = await dynamo.scan({ TableName: "movies" }).promise();

            let movies = res.Items;

            let results = [];

            for (let movie of movies) {
                let respone = await getRequest("/movie/" + movie.movie_id + API_KEY);

                let validKeys = ["id", "title"];

                respone = Object.entries(respone).filter(([key]) => validKeys.includes(key));
                respone = Object.fromEntries(respone);

                results.push(respone);

            }

            body = JSON.stringify(results);
        }

        //Get top 5 highest-rating movies
        else if (resource === "GET /movies/highest-rating") {
            body = "";

            let res = await dynamo.scan({ TableName: "movies" }).promise();
            data = res.Items;

            let items = JSON.parse(JSON.stringify(data));

            const filterOver100Ratings = (item) => { return item['rating times'] >= 100 }

            var topRating = items.sort((a, b) => b.rating - a.rating).filter(filterOver100Ratings).slice(0, 10);

            let results = [];

            for (let movie of topRating) {
                let respone = await getRequest("/movie/" + movie.movie_id + API_KEY);

                let validKeys = ["id", "title", "poster_path"];

                respone = Object.entries(respone).filter(([key]) => validKeys.includes(key));
                respone = Object.fromEntries(respone);

                respone.rating = movie.rating;
                respone.rating_times = movie['rating times'];

                results.push(respone);
            }

            body = JSON.stringify(results);

        }

        //Get top 5 most-viewed movies
        else if (resource === "GET /movies/most-viewed") {
            body = "";

            let res = await dynamo.scan({ TableName: "movies" }).promise();
            data = res.Items;

            let items = JSON.parse(JSON.stringify(data));
            //body += JSON.stringify(items.length);

            var topView = items.sort((a, b) => b.views - a.views).slice(0, 10);

            //topView = await getInfo(topView);

            let results = [];

            for (let movie of topView) {
                let respone = await getRequest("/movie/" + movie.movie_id + API_KEY);

                let validKeys = ["id", "title", "poster_path"];

                respone = Object.entries(respone).filter(([key]) => validKeys.includes(key));
                respone = Object.fromEntries(respone);

                respone.rating = movie.rating
                respone.views = movie.views

                results.push(respone);
            }

            body = JSON.stringify(results);
        }

        //Search movies include(title)
        else if (resource === "GET /movies/search/{title}") {
            body = "";
            const respone = await getRequest("/search/movie" + API_KEY + "&query=" + event.pathParameters.title);
            //console.log(respone.results);

            let results = [];

            var movies = JSON.parse(JSON.stringify(respone.results));

            for (let movie of movies) {
                let search_id = movie.id.toString();

                console.log(search_id);

                let res = await dynamo.get({
                    TableName: "movies",
                    Key: {
                        movie_id: search_id
                    }
                }).promise();

                if (!(Object.keys(res).length === 0)) {
                    console.log("found: " + JSON.stringify(res));
                    results.push(movie);
                }
            }

            movies = [];

            let validKeys = ["id", "title", "poster_path", "release_date"];

            for (let movie of results) {
                movie = Object.entries(movie).filter(([key]) => validKeys.includes(key));
                movie = Object.fromEntries(movie);

                movies.push(movie);
            }

            body = JSON.stringify(movies);

        }

        //Get all info needed for 1 specific movie by id
        else if (resource === "GET /movie/{id}") {
            let input_id = event.pathParameters.id;

            let movie = await getRequest("/movie/" + input_id + API_KEY);

            let validKeys = ["id", "title", "poster_path", "backdrop_path", "genres", "tagline", "overview", "runtime", "release_date"];
            movie = Object.entries(movie).filter(([key]) => validKeys.includes(key));
            movie = Object.fromEntries(movie);

            let respone = await dynamo
                .get({
                    TableName: "movies",
                    Key: {
                        movie_id: input_id
                    }
                })
                .promise();

            let movie2 = respone.Item;

            //Update the view count
            await dynamo.update({
                TableName: "movies",
                Key: {
                    movie_id: movie2.movie_id
                },
                UpdateExpression: 'SET #var1 = :val1',
                ExpressionAttributeValues: {
                    ":val1": movie2.views + 1
                },
                ExpressionAttributeNames: {
                    "#var1": "views"
                }
            }).promise();

            movie.rating = movie2.rating;
            movie.views = movie2.views;
            movie.rating_times = movie2['rating times'];

            body = JSON.stringify(movie);
        }

        //POST request to rate a movie
        else if (resource === "POST /movies/rate") {
            let request = JSON.parse(event.body);

            //Scan to get number of current items
            let res = await dynamo.scan({
                TableName: "ratings",
                Count: true
            }).promise();

            //Save the rate records
            await dynamo
                .put({
                    TableName: "ratings",
                    Item: {
                        id: res.Count.toString(),
                        user_id: request.user_id,
                        movie_id: request.movie_id,
                        rating: request.rating,
                        timestamp: Date.now()
                    }
                })
                .promise();

            //Get the movie by id
            let movie = await dynamo
                .get({
                    TableName: "movies",
                    Key: {
                        movie_id: request.movie_id
                    }
                })
                .promise();

            movie = movie.Item;

            let new_rating = (parseFloat(movie.rating) * movie['rating times'] + request.rating) / (movie['rating times'] + 1);

            await dynamo.update({
                TableName: "movies",
                Key: {
                    movie_id: request.movie_id
                },
                UpdateExpression: 'SET #var1 = :val1, #var2 = :val2',
                ExpressionAttributeValues: {
                    ":val1": new_rating,
                    ":val2": movie['rating times'] + 1
                },
                ExpressionAttributeNames: {
                    "#var1": "rating",
                    "#var2": "rating times"
                }
            }).promise();
            body = JSON.stringify("success");
        }

        //Get request to get info of a user on database with specified id
        else if (resource === "GET /users/{id}") {
            let user_id = event.pathParameters.id;

            let user = await dynamo.query({
                TableName: "users_v2",
                KeyConditionExpression: "#UserId = :UserId",
                ExpressionAttributeNames: {
                    "#UserId": "USER_ID"
                },
                ExpressionAttributeValues: {
                    ":UserId": user_id
                }
            }).promise();

            user = user.Items[0];

            body = JSON.stringify(user);
        }


        else if (resource === "GET /ratings") {
            let request = event.queryStringParameters;
            
            let user_id = request.user_id;
            let movie_id = request.movie_id;

            let rate = await dynamo.scan({
                TableName: 'ratings',
                FilterExpression: 'user_id = :UserId AND movie_id = :MovieId',
                ExpressionAttributeValues: {
                    ":UserId": user_id,
                    ":MovieId": movie_id
                }
            }).promise();
            
            rate.Items.sort((a,b) => b.timestamp - a.timestamp);

            body = JSON.stringify(rate.Items);
        }

        else {
            throw new Error(`Unsupported route: "${event.routeKey}"`);
        }
    }
    catch (err) {
        statusCode = 400;
        body = err.message;
    }
    finally {
        //body = JSON.stringify(body);
    }

    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
        },
        body: body
    }
};