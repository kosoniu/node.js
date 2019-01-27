-- wybranie składników na podstawie przepisu

SELECT recipes.name, ingredients.name, rec_ing_rel.quantity, rec_ing_rel.unit FROM recipes
JOIN rec_ing_rel on rec_ing_rel.recipe_id = recipes.id
JOIN ingredients on rec_ing_rel.ingredient_id = ingredients.id
WHERE recipes.name = 'Ziemniaki w mundurkach'

--  wybranie przepisów na podstawie nazwy składnika

SELECT recipes.name, recipes.description FROM recipes
JOIN rec_ing_rel on rec_ing_rel.recipe_id = recipes.id
JOIN ingredients on rec_ing_rel.ingredient_id = ingredients.id
WHERE ingredients.name = 'ziemniak'

--  wybranie przepisów po tagu

SELECT recipes.name FROM recipes
JOIN rec_tag_rel on rec_tag_rel.recipe_id = recipes.id
JOIN tags on rec_tag_rel.tag_id = tags.id
WHERE tags.name = 'na zimno'

-- wybranie komentarzy dla danego przepisu po imieniu użytkownika

SELECT comments.description, recipes.name FROM comments
JOIN users on comments.user_id = users.id
JOIN recipes on comments.recipe_id = recipes.id
WHERE users.name = "Andrzej"

-- wybranie przepis dla danego użytkownika po imieniu

SELECT recipes.name as Przepis, users.name as Imie, users.surname as Nazwisko FROM recipes
JOIN users on recipes.user_id = users.id
WHERE users.name = "Anna"

-- wybranie zablokowanych komentarzy

SELECT comments.description as Komentarz, blocked_comments.reason as Powod, users.nickname as "Zablokowane przez", recipes.name as Przepis FROM blocked_comments
JOIN users on users.id = blocked_comments.user_id
JOIN comments on comments.id = blocked_comments.id
JOIN recipes on comments.recipe_id = recipes.id

-- wybranie przepisów dla danego użytkownika

SELECT recipes.name as Przepis, users.name as Imie, users.surname as Nazwisko FROM recipes
JOIN users on recipes.user_id = users.id
WHERE users.name = "Anna"

-- wybranie ról użytkowników

SELECT users.name, users.surname, user_types.name FROM users
JOIN user_type_rel on users.id = user_type_rel.user_id
JOIN user_types on user_type_rel.type_id = user_types.id

-- sprawdzanie nazw kluczy obcych

SELECT
  TABLE_NAME,
  COLUMN_NAME,
  CONSTRAINT_NAME,   -- <<-- the one you want! 
  REFERENCED_TABLE_NAME,
  REFERENCED_COLUMN_NAME
FROM INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
  REFERENCED_TABLE_NAME = 'users';