# Enterprise Web Dev - Assignment 1.

__Name:__ [your name]

### Overrview.

[A bullet-point list of the features developed for the React SPA app (new/modified ones only for the Movies app),]

+ Feature X.
+ Feature Y. 
+ etc.

## Feature Design.

[For each feature listed in the overview, show a screenshot(s) of its UI layout (use appropriate magnification for accessibility). Include a caption and specify its URL path.]

e.g. 
__The Upcoming Movies feature.__


![][image1]

> Lists movies from the Upcoming movies endpoint of TMDB

__URL:__ /movies/upcoming
__Movie Reviews.__

__Movies Reviews feature.__

![][image2]

> Lists all the reviews for a particular movie (text extract only).

__URL:__/movies/:id


![][image3]

> Shows the full text of a review for a movie. 

__URL:__/reviews/:id

## Storybook.

[Include a screenshot(s) from the Storybook UI and highlight the stories for new components developed.]

e.g.

![][image5]


### Server state caching.

[Show a screenshot(s) from the react-query Dev tools that illustrate all the entity types cached by your app (Use appropriate magnification for accessibility). State the type of data relating to each cache entry.]

e.g.

![][image4]

+ [discover] - List of movies from the Discovery endpoint.
+ [movie,[id,:id]] - All properties for a particular movie.
+ etc

## Authentication.

[Briefly explain the method used for supporting authentication and include any relevant screenshots (e.g. Dev tools Network tab for session keys). State which parts of the app's functionality require authentication, e.g. the Favourites feature.]

## Algorithm (if relevant).

[State the purpose of the algorithm you chose to implement and explain, in general, the computation model used.]

## Additional Information.

[Highlight any other aspects of your app's design or implementation that is non-standard and worthy of mention.]

[image1]: ./images/image1.png
[image2]: ./images/image2.png
[image3]: ./images/image3.png
[image4]: ./images/image4.png
[image5]: ./images/image5.png