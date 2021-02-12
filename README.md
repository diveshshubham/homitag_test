# homitag_test
Instructions to be followed:
 1.these data are not added to database as these are fresh database
 2.if you face any diffculty plesae see the sample.txt file to read the proper format
 3.you can replace your own api key for mongoDb
 4. I would recommend to use postman app to test this api
 5.enter these apis endpoint to get your desired answer.


1.Default_page (get) : https://shubham-homitag-test.herokuapp.com/


2.add_genre (post method) = https://shubham-homitag-test.herokuapp.com/add_genre
    method:post
    req:
    {
        "genre_name": "Romantic",
        "genre_description": "Ah, what would the great cinema tradition be if it weren’t for the countless stories of love and courtship. Since the advent of the movie theater experience, cinema has long been a favored pastime for couples looking to escape into a world of romance."
    }

3.show_all_genre (get method) : https://shubham-homitag-test.herokuapp.com/show_all_genre

4.update_genre (post method): https://shubham-homitag-test.herokuapp.com/update_genre
    Req:
    {
        "genre_to_be_updated":"Horror",
        "genre_description":"testing update"
    }

5.to remove genre (delete method) : https://shubham-homitag-test.herokuapp.com/remove_genre
    Req:
    {
        "genre_name":"Horror"
        
    }

6. To add movies
Endpoint: https://shubham-homitag-test.herokuapp.com/add_movie
Method: Post
Req:
    {
        "movie_name":"arrival",
        "movie_description":"A linguist works with the military to communicate with alien lifeforms after twelve mysterious spacecrafts appear around the world.",
        "genre_name":"Drama",
        "release_date":"2016-11-11",
        "duration":"2 hours",
        "rating":"4 stars"
        
    }

7.To view all movies
Endpoint:https://shubham-homitag-test.herokuapp.com/show_movies
Method: Get

8.To update movies description
Endpoint: https://shubham-homitag-test.herokuapp.com/update_movies?description=confirm
Method: Post
Req:
    {
        "movie_name":"sherlock holmes",
    "new_description":"testing update endpoint"
    }

9.to update release date
Endpoint:https://shubham-homitag-test.herokuapp.com/update_movies?released_date=confirm
Method:Post
Req:
    {
        "movie_name":"sherlock holmes",
        "new_release_date":"2012-09-21"
    }

10.to update genre
Endpoint: https://shubham-homitag-test.herokuapp.com/update_movies?genre=confirm
Method:Post
Req:
    {
        "movie_name": "sherlock holmes",
        "genre": "Drama"
    }

11.to update movie duration 
Endpoint:https://shubham-homitag-test.herokuapp.com/update_movies?duration=confirm
Method:Post
Req:
    {
        "movie_name": "sherlock holmes",
        "new_duration": "4 hours"
    }

12.to update rating
Endpoint:https://shubham-homitag-test.herokuapp.com/update_movies?rating=confirm
Method:Post
Req:
    {
        "movie_name": "sherlock holmes",
        "new_rating": "5 stars"
    }

13.to remove movies
Endpoint: https://shubham-homitag-test.herokuapp.com/delete_movie
Method: delete
Req:
    {
        "movie_to_be_deleted": "sherlock holmes"
    
    }
