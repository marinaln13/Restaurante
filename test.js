import {
  Dish,
  Category,
  Allergen,
  Restaurant,
  Menu,
  Coordinate,
} from "./ObjectsRestaurant.js";
import RestaurantsManager, {
  EmptyValueException,
} from "./RestaurantsManager.js";

const manager = RestaurantsManager.getInstance();

//Creamos objetos sin el manager
let di1 = new Dish("Flan");
//let di2 = new Dish(""); //EmptyValueException
let cat1 = new Category("Postres");
let al1 = new Allergen("Polen");
let res = new Restaurant("Podenco");
let coor = new Coordinate("123453", "384901");
let coor2 = new Coordinate("236536", "536323");
console.log((cat1.description = "Platos de postre"));
console.log((di1.description = "Delicioso flan de huevo"));
//console.log((di1.ingredients = "hola")); //InvalidValueException
console.log((di1.ingredients = ["huevo", "leche"]));
console.log(di1);
//console.log((res.location = "hello")); //InvalidValueException
console.log((res.location = coor));

// Crea algunas categorías, alérgenos, platos, menús y restaurantes

const dish1 = manager.createDish("Ensalada César");
const dish2 = manager.createDish("Filete a la parrilla");
const dish3 = manager.createDish("Tarta de queso");

console.log("EEEEEEEEEEEEEEEEEEEE" + dish2);

const category1 = manager.createCategory("Entrantes");
const category2 = manager.createCategory("Entrantes");
const category3 = manager.createCategory("Platos principales");

const allergen1 = manager.createAllergen("Gluten");
const allergen2 = manager.createAllergen("Nueces");
const allergen3 = manager.createAllergen("Marisco");
const allergen4 = manager.createAllergen("Lactosa");

const menu1 = manager.createMenu("Menú de la Casa");
const menu2 = manager.createMenu("Menú Infantil");

const res1 = manager.createRestaurant("Restaurante Ejemplo");
console.log((res1.location = coor2));

/* No hace nada porque no se han añadido categorías
for (let o of manager.getCategories()) {
  console.log(o);
}
*/

// Añade las categorías, alérgenos, platos, menús y restaurantes al manager

manager.addDish(dish1);
manager.addDish(dish2);
//manager.addDish(res1); //ObjectManagerException

manager.addCategory(category1);
//manager.addCategory(category2); //CategoryExistException
manager.addCategory(category3);

manager.addAllergen(allergen1);
manager.addAllergen(allergen2).addAllergen(allergen3);
manager.addAllergen(allergen4);

manager.addMenu(menu1);
manager.addMenu(menu2);

manager.addRestaurant(res1);
manager.addRestaurant(res); //Añadimos un restaurante creado fuera del manager

//console.log(manager.categories); //undefined

//Recorremos las colecciones con los elementos que hemos añadido

for (let o of manager.getCategories()) {
  console.log(o);
}

for (let m of manager.getMenus()) {
  console.log(m);
}

for (let a of manager.getAllergens()) {
  console.log(a);
}

// Borramos alérgenos y los mostramos
console.log(manager.removeAllergen(allergen2).removeAllergen(allergen3));

for (let a of manager.getAllergens()) {
  console.log(a);
}

for (let r of manager.getRestaurants()) {
  console.log(r);
}

console.log("Asignaciones");
// Asigna categorías, alérgenos y platos a un menú
manager.assignCategoryToDish(category1, dish3); //Añade el plato que no estaba añadido
manager.assignCategoryToDish(category1, dish2);
manager.assignCategoryToDish(category1, dish1);
manager.assignCategoryToDish(category3, dish2);
manager.assignAllergenToDish(allergen1, dish1);
manager.assignAllergenToDish(allergen4, dish1);
manager.assignAllergenToDish(allergen2, dish2);
manager.assignAllergenToDish(allergen2, dish2); //No  lo añade porque ya está añadido
manager.assignAllergenToDish(allergen1, dish2);
manager.assignAllergenToDish(allergen1, dish3);
manager.assignDishToMenu(menu1, dish1);
manager.assignDishToMenu(menu1, dish2);
manager.assignDishToMenu(menu1, dish3);

//manager.changeDishesPositionsInMenu(menu1, allergen1, dish2); //ObjectManagerException
manager.changeDishesPositionsInMenu(menu1, dish3, dish2);

manager.deassignDishToMenu(menu1, dish3);
//manager.changeDishesPositionsInMenu(menu1, dish3, dish2); //NotAssignedException

const orden = (a, b) => a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase();

const criterio = (dish) => dish.name === "Ensalada César";

console.log("getDishesInCategory:");
for (let dm of manager.getDishesInCategory(category1, orden)) {
  console.log(dm);
}

console.log("getDishesWithAllergen:");
for (let da of manager.getDishesWithAllergen(allergen1, orden)) {
  console.log(da);
}

manager.deassignCategoryToDish(category1, dish1);
console.log("FindDishes:");
for (let da of manager.findDishes(criterio)) {
  console.log(da);
}

console.log("getDishes:");
for (let da of manager.getDishes()) {
  console.log(da);
}

/*
// Imprime información sobre los platos en una categoría y con un alérgeno
console.log('Platos en la categoría "Entradas":');
for (const dish of manager.getDishesInCategory(category1)) {
  console.log(dish.name);
}

console.log('\nPlatos con el alérgeno "Gluten":');
for (const dish of manager.getDishesWithAllergen(allergen1)) {
  console.log(dish.name);
}

// Intercambia posiciones de dos platos en un menú
manager.chageDishesPositionsInMenu(menu1, dish1, dish2);

// Imprime información sobre los platos en un menú después del intercambio
console.log("\nPlatos en el menú después del intercambio de posiciones:");
//for (const dish of menu1.dishes) {
//  console.log(dish.name);
//}
*/
// Limpia el manager (borra todas las categorías, alérgenos, platos, menús y restaurantes)
manager.clear();
