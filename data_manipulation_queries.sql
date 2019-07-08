--  || ALLIANCES ||
-- Adding Alliances
INSERT INTO alliances (name, credits, government) 
VALUES (:nameInput, :creditsInput, :governmentInput);

-- Removing Alliances
DELETE FROM alliances WHERE name = :nameInput;

-- Reading all Alliances
SELECT * FROM alliances;

-- Update Alliance

UPDATE alliances SET name = :nameInput, credits= :creditsInput, government = :governmentInput WHERE id= :allianceID


--  || Characters ||
-- Adding Characters
INSERT INTO characters (fname, lname, race, homeworld, association) 
VALUES (:fnameInput, :lnameInput, :race_id_from_dropdown_Input, :homeworld_id_from_dropdown_Input, :association_id_from_dropdown_Input);

-- Removing Character
DELETE FROM characters WHERE fname = :fnameInput AND lname = :lnameInput;

-- Reading all Characters
SELECT * FROM characters;

-- Update Characters

UPDATE characters SET fname = :fnameInput, lname = :lnameInput, race= :race_id_from_dropdown_Input, homeworld = :homeworld_id_from_dropdown_Input, association = :association_id_from_dropdown_Input WHERE id= :charID

--  || Movies ||
-- Adding Movies
INSERT INTO movies (title, year) 
VALUES (:titleInput, yearInput);

-- Removing Movies
DELETE FROM movies WHERE title = :titleInput;

-- Reading all Movies
SELECT * FROM movies;

-- Update Movies

UPDATE movies SET title = :titleInput, year = :yearInput WHERE id= :movieID


--  || Species ||
-- Adding Species
INSERT INTO species (name, lifespan, height, classification) 
VALUES (:nameInput, :lifespanInput, :heightInput, :classificationInput);

-- Removing Species
DELETE FROM species WHERE name = :nameInput;

-- Reading all Species
SELECT * FROM species;

-- Update Species

UPDATE species SET name = :nameInput, lifespan = :lifespanInput, height= :heightInput, classification = :classificationInput WHERE id= :sceciesID


--  || Planets ||
-- Adding Planets
INSERT INTO planets (name, diameter, population, climate) 
VALUES (:nameInput, :diameterInput, :populationInput, :climateInput);

-- Removing Planets
DELETE FROM planets WHERE name = :nameInput;

-- Reading all Planets
SELECT * FROM planets;

-- Update Planets

UPDATE planets SET name = :nameInput, diameter = :diameterInput, population= :populationInput, climate = :climateInput WHERE id= :planetID
