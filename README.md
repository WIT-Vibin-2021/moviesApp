# Enterprise Web Dev - Assignment 1

__Name:__ VIBIN VARGHESE [Studenet Id: 20096057 ]

### Overrview
New feature
+ Login/Sign Up
+ Private and public route
+ Keyword movie search (top of site header)
+ Multiple criteria selection search
+ Favorite movies saved to Mongo DB
+ Filter options(extra language, Sorting)
+ Pagination in pages
+ Video/Trailer - Modal popup(In list view and deatils View page)
+ Menus grouped to movies and TV shows (Sub Menus)
+ Favorite button click alert for login (if user is not logged in)
+ Fantasy Movie Making(Web Form) 
New Pages
+ Trending Movies
+ Now Playing
+ TopRated Movies
+ Similar Movies
+ Recommended Movies
+ TV Shows Popular (new card and more info page structure with more details )
+ Upcoming Movies(extended from lab exercise)

Part of lab and modified
+ Review (View and Write)
+ Movie details page(Movies external webpage open in new tab, more details, structure redesigned)
+ ToolTip on mouse hover
+ Movie Card - Added functionality for Video popup, Recommended movies, Similar movies

Storybook
+ All components 
    * Login, Signup
    * Search, filter, fantasy movie form 
    * Movies and TV shows card, details
    * All header
    

## Feature Design.

__Login and Signup__
> User can login or signup in this page. Both option is given side-to-side. Sign up details are saved to Mongo DB, and while login the details are authenticated with the DB data. Without login few options in the web app wont work.

__URL:__ /login

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/1LoginPage.png)
---
__Key word search__
> Search bar on top right corner of site header for searching movies by keyword. Result will be shown in a page with keyword used.
> 
__URL:__ /search/:keyword

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/2KeywordSearch.png)
---
__Multiple criteria search__
> Search floating button on left side of the page is given to open the window of multiple critera search. Here users can select any options like Release year, Genre, Language and sort result based on popularity, rating, release date or orignal title. Result will be in a new page.
 
__URL:__ /searchcriteria/:genre/:language/:year/:sortorder

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/3SearchWindow.png)
---
__Filter Result__
> Filter floating button on right side of the page is given to open the window of filtering the result. Here users can select any options like Key word, Genre, Language and sort result in ascending or descending order of result. Filter result will be in the same page. Note:This is a result filter.

__URL:__ /

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/4FilterWindow.png)
---

__Video Popup__
> Related video of the movies can be viewd by clicking the poster of the movie while it is listed in the page, or the same can be achived on the details information page when click on the video button.

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/5Video%20PopUp%201.png)
![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/5Video%20PopUp%202.png)
---

__Menu Grouped__
> All the movies and tv menus are group. Added submenus.

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/6SubMenu.png)
---

__Alerts__
> If the user is not logged in, and try to set a movie as favorite, system will alert the user to login. But if you click on the menu, it will re direct to login page

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/7Alert.png)
---

__Pagination__
> Pagination is enabled in the pages. 

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/Pagination.png)
---

__Fantasy Movie Making__
> If user logged in, can access the Fantasy movie making page from the submenu of movies. Here user can give details of title, genre, language, release date(picker control), running time(picker control), multiple selection of cast members, add overview and finally, can upload the poster of the movie. And button to save.

__URL:__ /fantasymovies

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/8FantacyMovie.png)
---

__Trending Movies Page__
> Listed out the Trending Movies of the week from TMDB API endpoint. 

__URL:__ /movies/trending

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/9Trending%20Movies.png)
---

__Now Playing Movies Page__
> Listed out the Now Playing Movies from TMDB API endpoint. 

__URL:__ /movies/nowplaying

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/10NowPlaying.png)
---

__Top Rated Movies Page__
> Listed out the top rated Movies from TMDB API endpoint. List sorted based on the movie rating.

__URL:__ /movies/toprated

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/11TopRatted.png)
---
__Similar Movies__
> This can be vies from the button on the movie Card or from the movie details page. Once user clicked those buttons, based on the selected movie similar movies (keyword and genre based) will be listed out from the TMDB API endpoint in a new page.

__URL:__ /similar/:movieId

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/12Similar%201.png)
![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/12Similar%202.png)
---

__Recommended Movies__
> Like Similar movies user can see the recommended movies list, once click on the button in the movie card. Once user clicked those buttons, based on the selected movie recommended movies will be listed out from the TMDB API endpoint in a new page.

__URL:__ /recommended/:movieId

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/13%20Reccommended.png)
---

__TV Shows (Popular)__
> Tv Shows menu have a submenu to open the Popular tv shows, it will list out the popular tv shows from the TMDB endpoint.

__URL:__ /tvshows/popular

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/14TVShows.png)
---

__Upcoming Movies Page__
> Listed out the upcoming Movies from TMDB API endpoint. List sorted based on the date of movie.

__URL:__ /movies/upcoming

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/14Upcoming.png)
---

__Movies more info Page__
> On the move card, given option for more information, if user click the button; New page will open with more details of the movie.

__URL:__ /movies/:movieId

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/15MoreInfo%20Movies.png)
---

__Review Summary__
> Movies page more details page have button on the top right for seeing the review Summary

__URL:__ /movies/:movieId

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/16ReviewSummary.png)
---

__Full Review__
> From the summary window, if user wish to read full review, can click on the Full Review link. Which show the full review in the same page.

__URL:__ /reviews/:reviewId

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/17FullReview.png)

---

__Favourite Movies__
> + User can set the Favourite movied if the user is loggedin. Favorite button on the card will set the to Favourite list. Which will be saved to the Mongo DB and can be viewd in the favorite movie page.
> + User can delete the favorite movies from this page, with the detele button.
> + User can also write reviews for the movied my clicking the review icon next to delete.

__URL:__ /movies/favourites

Favorite Icons

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/18Fav%20Button.png)

Favorite Page

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/18%203%20Fav.png)

Favorite Saved to Mongo DB - Compass

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/18%202%20Fav%20DB.png)

Favorite movies - Write review

__URL:__ /movies/favourites/form

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/18%204%20Fav.png)

---

## Storybook.

> List of new components in the story book

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB0000.png)


> Search Criteria component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB%201%20Search.png)


> Filter the movies component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB2%20Filter.png)


> Fantasy Movie Maker component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB3%20Fantasy%20Movie.png)


> Login component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB4%20LOGIN.png)


> Sign Up component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb9SignUp.png)


> Movie Card component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB5%20MOVIE%20CARD.png)


> Movie Card exception component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/SB6%20Movie%20card%20error.png)


> Movie Details component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb7%20movie%20details2.png)


> Movie header component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb8movie%20header.png)


> TV Card component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb10tv%20acrd.png)


> TV Card exception component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb11%20tv%20error.png)


> TV Details component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb12%20tv%20details2.png)


> TV details header component

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/sb13%20tv%20header.png)

----

### Server state caching.

![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/Serverstate%20caching.png)

+ [peoples] - List of popular peoples from TMDB endpoint.
+ [genres] - List of genres from TMDB endpoint.
+ [tvshows:[page:pageno]] - First page of popular tv shows from TMDB end point.
+ [moviesByCriteria:[genreid:genreid],[lang:languageid],[sort:sortorder],[year:year]] - Search details from TMDB end point, by passing parameter genre, language, year, sorting order.
+ [recommended:[query:movieid]] - List of recommended movies from TMDB endpoint based on the movie id parameter passed to endpoint.
+ [moviesSimilar:[query:movieid]] - List of similar movies from TMDB endpoint based on the movie id parameter passed to endpoint.
+ [topratedmovies]] - First page of top rated movies from TMDB end point.
+ [upcoming]] - First page of upcoming movies from TMDB end point.
+ [nowplayingmovies]] - First page of now playing movies from TMDB end point.
+ [trending]] - First page of trending from TMDB end point.
+ [pages,[pages,:page]] - Discover movies from TMDN endpoint based on page number.
+ [language] - List of language from the TMDN end point.


## Authentication.

> I have created the API for sign up and login authentication. Data is saved to Mongo DB on movie app API call. Password is been encrypted before saving to the database.
+ Private route - Based on the login authentication, two sub menus of movie is set as private route. If user access those menus and user is not loggedin, app will redirect the page to Login Page. The two menus are 
    + Favorite Movies 
    + Fantasy Movies Making
+ The Favorite button given in the movies card is also blocked based on the authentication.
+ While Sign up, the external API is called and all the JSON body is passed to the API end point, where the system encrypte the password and save to "Accounts" in movies_db.
![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/PrivateRoute.png)
![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/XLogin%20API%20CALL.png)

> Private route demo.
> 
![image](https://github.com/WIT-Vibin-2021/moviesApp/blob/master/images/PrivateRoute.gif)

__POST API - Sign UP__ : localhost:8080/api/accounts

__POST API - Authentication__ : localhost:8080/api/accounts/security/token

__GET API - Account Details__ : localhost:8080/api/accounts/email/:emailId

__POST API - Favorite__ : localhost:8080/api/accounts/:userId/favourites


## Additional Information.

> Color and deign is inspired by the "https://www.themoviedb.org/".
> 
> TMDB API used

    + 1. Movies Genres List : https://api.themoviedb.org/3/genre/movie/list?api_key=<<api_key>>&language=en-US
    + 2. Language List : https://api.themoviedb.org/3/configuration/languages?api_key=<<api_key>>
    + 3. Peoples Popular: https://api.themoviedb.org/3/person/popular?api_key=<<api_key>>&language=en-US&page=1
    + 4. Movies Image: https://api.themoviedb.org/3/movie/{movieid}/images?api_key=<<api_key>>
    + 5. Video of Movie: http://api.themoviedb.org/3/movie/{movieId+}/videos?api_key=<<api_key>>

    + 6. Key Word Search: https://api.themoviedb.org/3/search/movie?api_key=<<api_key>>&query={keyword}&page=1&include_adult=false
    + 7. Serach Criteria Movies: https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&with_genres={generid}&language={lang}&year={year}&sort_by={sortcode}&include_adult=false&include_video=false&page=1

    + 8. Movies Details : https://api.themoviedb.org/3/movie/{movie_id}?api_key=<<api_key>>
    + 9. Movies Review: https://api.themoviedb.org/3/movie/${movieid}/reviews?api_key=<<api_key>>

    + 10. TV Shows Popular: https://api.themoviedb.org/3/tv/popular?api_key=<<api_key>>&language=en-US&page={page}
    + 11. TV Show Details: https://api.themoviedb.org/3/tv/{tvid}?api_key=<<api_key>>&language=en-US
    + 12. TV Videos: https://api.themoviedb.org/3/tv/{tvId}/videos?api_key=<<api_key>>&language=en-US

    + 13. Movies Discover : https://api.themoviedb.org/3/discover/movie?api_key=<<api_key>>&language=en-US&include_adult=false&include_video=false&page={page}
    + 14. Upcoming Movies: https://api.themoviedb.org/3/movie/upcoming?api_key=<<api_key>>&language=en-US&include_adult=false&include_video=false&page=1
    + 15. Top Rated Movies: https://api.themoviedb.org/3/movie/top_rated?api_key=<<api_key>>&language=en-US&include_adult=false&include_video=true&page=1
    + 16. Similar Movies: https://api.themoviedb.org/3/movie/{movieid}/similar?api_key=<<api_key>>
    + 17. Now Playing Movies: https://api.themoviedb.org/3/movie/now_playing?api_key=<<api_key>>&language=en-US&page=1
    + 18. Trending Movies: https://api.themoviedb.org/3/trending/movie/week?api_key=<<api_key>>
    + 19. Recommended Movies : https://api.themoviedb.org/3/movie/{movieid}/recommendations?api_key=<<api_key>>&language=en-US&page=1

## Youtube Demo Video

> https://www.youtube.com/watch?v=HIdzE7bYtt4 
    
