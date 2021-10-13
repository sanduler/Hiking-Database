--Ryan Jones and Ruben Sanduleac
--SQL file with data manipulation queries

----------------
--SELECT queries
----------------
	--SELECTS for displaying all Locations on the Search page (Hike name, State, City and Zip Code)
	SELECT Hikes.hikeID, Hikes.hikeName, Locations.locationID as id, Locations.hikeID, Locations.city, Locations.state, Locations.zipCode FROM Locations JOIN Hikes ON Locations.hikeID = Hikes.hikeID

	--SELECTS for displaying all Hikes in a drop down menu for adding a new Location
	SELECT hikeID, hikeName, distance, elevation, difficulty, averageRating FROM Hikes

	--SELECTS for displaying Location information during updating
	SELECT Hikes.hikeID, Hikes.hikeName, Locations.locationID as id, Locations.hikeID, Locations.city, Locations.state, Locations.zipCode FROM Locations JOIN Hikes ON Locations.hikeID = Hikes.hikeID WHERE locationID =?

	--SELECTS for displaying all People on the User page (Username, Firstname, Lastname)
	SELECT peopleID as id, username, firstName, lastName FROM People

	--SELECTS for displaying People information during updating
	SELECT peopleID as id, username, firstName, lastName FROM People WHERE peopleID = ?

	--SELECTS for displaying all Hikes on the Hikes page (Hike name, distance, elevation, difficulty and averageRating)
	SELECT hikeID as id, hikeName, distance, elevation, difficulty, averageRating FROM Hikes

	--SELECTS for displaying Hike information during updating
	SELECT hikeID as id, hikeName, distance, elevation, difficulty, averageRating FROM Hikes WHERE hikeID = ?

	--SELECTS for displaying all Ratings on the Ratings page (Hike name, Rater's first name, Rater's last name, Rater's username, Rating and Rating Date)
	SELECT Hikes.hikeID, Hikes.hikeName, People.peopleID, People.firstName, People.lastName, People.username, Ratings.ratingID as id, Ratings.ratingScore, Ratings.ratingTime FROM Ratings JOIN Hikes ON Ratings.hikeID = Hikes.hikeID JOIN People ON Ratings.peopleID = People.peopleID

	--SELECTS for displaying all Hikes in a drop down menu for adding a new Rating
	SELECT hikeID, hikeName FROM Hikes

	--SELECTS for displaying all People in a drop down menu for adding a new Rating
	SELECT peopleID, username FROM People

	--SELECTS for displaying Rating information during updating
	SELECT Hikes.hikeID, Hikes.hikeName, People.peopleID, People.firstName, People.lastName, People.username, Ratings.ratingID as id, Ratings.ratingScore, Ratings.ratingTime FROM Ratings JOIN Hikes ON Ratings.hikeID = Hikes.hikeID JOIN People ON Ratings.peopleID = People.peopleID WHERE ratingID = ?



----------------
--INSERT queries
----------------
	--INSERTS a new Location into the Location table
	INSERT INTO Locations (locationID, hikeID, state, city, zipCode) VALUES (NULL,?,?,?,?)

	--INSERTS a new Person into the People table
	INSERT INTO People (peopleID, username, password, firstName, lastName) VALUES (NULL,?,?,?,?)

	--INSERTS a new Hike into the Hikes table
	INSERT INTO Hikes (hikeID, hikeName, distance, elevation, difficulty, averageRating) VALUES (NULL,?,?,?,?,?)

	--INSERTS a new Rating into the Ratings table
	INSERT INTO Ratings (ratingID, hikeID, peopleID, ratingScore, ratingTime) VALUES (NULL,?,?,?,CURDATE())



----------------
--UPDATE queries
----------------
	--UPDATES a specified Location in the Locations table
	UPDATE Locations SET state=?, city=? zipCode locationID=?

	--UPDATES a specified Person in the People table
	UPDATE People SET username=?, firstName=?, lastName=? WHERE peopleID=?

	--UPDATES a specified Hike in the Hikes table
	UPDATE Hikes SET hikeName=?, distance=?, elevation=?, difficulty=?, averageRating=? WHERE hikeID=?

	--UPDATES a specified Rating in the Ratings table
	UPDATE Ratings SET ratingScore=? WHERE ratingID=?



----------------
--DELETE queries
----------------
	--DELETES a specified Location in the Locations table
	DELETE FROM Locations WHERE locationID = ?

	--DELETES a specified Person in the People table
	DELETE FROM People WHERE peopleID = ?

	--DELETES a specified Hike in the Hikes table
	DELETE FROM Hikes WHERE hikeID = ?

	--DELETES a specified Rating in the Ratings table
	DELETE FROM Ratings WHERE ratingID = ?