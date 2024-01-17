//Importo las excepciones y los objetos
import {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  ManagerException,
  ObjecManagerException,
  DishExistsException,
  CategoryExistsException,
  AllergenExistsException,
  MenuExistsException,
  RestaurantExistsException,
  DishNotExistException,
  CategoryNotExistException,
  AllergenNotExistException,
  MenuNotExistException,
  RestaurantNotExistException,
  NotAssignedException,
} from "./exceptions.js";

import {
  Dish,
  Category,
  Allergen,
  Restaurant,
  Menu,
  Coordinate,
} from "./ObjectsRestaurant.js";

const RestaurantsManager = (function () {
  let instantiated;

  class RestaurantsManager {
    #categories;
    #allergens;
    #dishes;
    #menus;
    #restaurants;

    #productConstructors = {
      Dish,
      Category,
      Allergen,
      Menu,
      Restaurant,
    };

    constructor() {
      if (!new.target) throw new InvalidAccessConstructorException();

      this.#categories = new Map();
      this.#allergens = new Map();
      this.#dishes = new Map();
      this.#menus = new Map();
      this.#restaurants = new Map();
    }

    *getDishes() {
      for (let d of this.#dishes) {
        yield d;
      }
    }

    *getCategories() {
      for (let cat of this.#categories) {
        yield cat;
      }
    }

    *getMenus() {
      for (let m of this.#menus) {
        yield m;
      }
    }

    *getAllergens() {
      for (let al of this.#allergens) {
        yield al;
      }
    }

    *getRestaurants() {
      for (let res of this.#restaurants) {
        yield res;
      }
    }

    createDish(nameD) {
      let d = this.#dishes.get(nameD);

      if (!d) {
        d = new Dish(nameD);
      } else {
        d = d.dish;
      }
      return d;
    }

    createCategory(nameC) {
      let cat = this.#categories.get(nameC);

      if (!cat) {
        cat = new Category(nameC);
      } else {
        cat = cat.category;
      }
      return cat;
    }

    createAllergen(nameA) {
      let al = this.#allergens.get(nameA);

      if (!al) {
        al = new Allergen(nameA);
      } else {
        al = al.allergen;
      }
      return al;
    }

    createMenu(nameM) {
      let men = this.#menus.get(nameM);

      if (!men) {
        men = new Menu(nameM);
      } else {
        men = men.menu;
      }
      return men;
    }

    createRestaurant(nameR) {
      let res = this.#restaurants.get(nameR);

      if (!res) {
        res = new Restaurant(nameR);
      } else {
        res = res.restaurant;
      }
      return res;
    }

    addCategory(category) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (!this.#categories.has(category.name)) {
        this.#categories.set(category.name, category);
      } else {
        throw new CategoryExistsException(category);
      }

      return this;
    }

    removeCategory(category) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (this.#categories.has(category.name)) {
        for (let cat of this.#dishes.values()) {
          if (cat.categories.has(category.name)) {
            cat.categories.delete(category.name);
          }
        }
        this.#categories.delete(category.name);
      } else {
        throw new CategoryNotExistException(category);
      }

      return this;
    }

    addMenu(menu) {
      if (!(menu instanceof Menu)) {
        throw new ObjecManagerException("menu", "Menu");
      }
      if (!this.#menus.has(menu.name)) {
        this.#menus.set(menu.name, {
          menu,
          dishes: [],
        });
      } else {
        throw new MenuExistsException(menu);
      }

      return this;
    }

    removeMenu(menu) {
      if (!(menu instanceof Menu)) {
        throw new ObjecManagerException("menu", "Menu");
      }
      if (this.#menus.has(menu.name)) {
        this.#menus.delete(menu.name);
      } else {
        throw new MenuNotExistException(menu);
      }

      return this;
    }

    addAllergen(allergen) {
      if (!(allergen instanceof Allergen)) {
        throw new ObjecManagerException("allergen", "Allergen");
      }
      if (!this.#allergens.has(allergen.name)) {
        this.#allergens.set(allergen.name, allergen);
      } else {
        throw new AllergenExistsException(allergen);
      }

      return this;
    }

    removeAllergen(allergen) {
      if (!(allergen instanceof Allergen)) {
        throw new ObjecManagerException("allergen", "Allergen");
      }
      if (this.#allergens.has(allergen.name)) {
        for (let a of this.#dishes.values()) {
          if (a.allergens.has(allergen.name)) {
            a.allergens.delete(allergen.name);
          }
        }
        this.#allergens.delete(allergen.name);
      } else {
        throw new AllergenNotExistException(allergen);
      }

      return this;
    }

    addDish(dish) {
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }
      if (!this.#dishes.has(dish.name)) {
        this.#dishes.set(dish.name, {
          dish,
          categories: new Map(),
          allergens: new Map(),
        });
      } else {
        throw new DishExistsException(dish);
      }

      return this;
    }

    removeDish(dish) {
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }
      if (this.#dishes.has(dish.name)) {
        this.#dishes.delete(dish.name);
      } else {
        throw new DishNotExistException(dish);
      }

      return this;
    }

    addRestaurant(restaurant) {
      if (!(restaurant instanceof Restaurant)) {
        throw new ObjecManagerException("restaurant", "Restaurant");
      }
      if (!this.#restaurants.has(restaurant.name)) {
        this.#restaurants.set(restaurant.name, restaurant);
      } else {
        throw new RestaurantExistsException(restaurant);
      }

      return this;
    }

    removeRestaurant(restaurant) {
      if (!(restaurant instanceof Restaurant)) {
        throw new ObjecManagerException("restaurant", "Restaurant");
      }
      if (this.#restaurants.has(restaurant.name)) {
        this.#restaurants.delete(restaurant.name);
      } else {
        throw new RestaurantNotExistException(restaurant);
      }

      return this;
    }

    assignCategoryToDish(category, dish) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }
      if (!this.#categories.has(category.name)) {
        console.log("entracat");
        this.addCategory(category);
      }
      if (!this.#dishes.has(dish.name)) {
        console.log("entradis");
        this.addDish(dish);
      }

      this.#dishes.get(dish.name).categories.set(category.name, category);
      return this;
    }

    deassignCategoryToDish(category, dish) {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }

      if (this.#dishes.has(dish.name)) {
        if (this.#categories.has(category.name)) {
          if (!this.#dishes.get(dish.name).categories.delete(category.name)) {
            throw new NotAssignedException();
          }
        } else {
          throw new CategoryNotExistException(category);
        }
      } else {
        throw new DishNotExistException(dish);
      }

      return this;
    }

    assignAllergenToDish(allergen, dish) {
      if (!(allergen instanceof Allergen)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }
      if (!this.#allergens.has(allergen.name)) {
        this.addAllergen(allergen);
      }
      if (!this.#dishes.has(dish.name)) {
        this.addDish(dish);
      }

      this.#dishes.get(dish.name).allergens.set(allergen.name, allergen);
      return this;
    }

    deassignAllergenToDish(allergen, dish) {
      if (!(allergen instanceof Allergen)) {
        throw new ObjecManagerException("allergen", "Allergen");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }

      if (this.#dishes.has(dish.name)) {
        if (this.#allergens.has(allergen.name)) {
          if (!this.#dishes.get(dish.name).allergens.delete(allergen.name)) {
            throw new NotAssignedException();
          }
        } else {
          throw new AllergenNotExistException(allergen);
        }
      } else {
        throw new DishNotExistException(dish);
      }

      return this;
    }

    assignDishToMenu(menu, dish) {
      if (!(menu instanceof Menu)) {
        throw new ObjecManagerException("menu", "Menu");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }
      if (!this.#menus.has(menu.name)) {
        this.addMenu(menu);
      }
      if (!this.#dishes.has(dish.name)) {
        this.addDish(dish);
      }

      this.#menus.get(menu.name).dishes.push(dish);
      return this;
    }

    deassignDishToMenu(menu, dish) {
      if (!(menu instanceof Menu)) {
        throw new ObjecManagerException("menu", "Menu");
      }
      if (!(dish instanceof Dish)) {
        throw new ObjecManagerException("dish", "Dish");
      }

      if (this.#menus.has(menu.name)) {
        if (this.#dishes.has(dish.name)) {
          let arrayD = this.#menus.get(menu.name).dishes;
          let pos = arrayD.findIndex((x) => x.name === dish.name);
          if (!pos) {
            throw new NotAssignedException();
          }
          arrayD.splice(pos, 1);
        } else {
          throw new DishNotExistException(dish);
        }
      } else {
        throw new MenuNotExistException(menu);
      }

      return this;
    }

    changeDishesPositionsInMenu(menu, dish1, dish2) {
      if (!(menu instanceof Menu)) {
        throw new ObjecManagerException("menu", "Menu");
      }
      if (!(dish1 instanceof Dish)) {
        throw new ObjecManagerException("dish1", "Dish");
      }

      if (!(dish2 instanceof Dish)) {
        throw new ObjecManagerException("dish2", "Dish");
      }

      let arrayD = this.#menus.get(menu.name).dishes;
      let pos1 = arrayD.findIndex((x) => x.name === dish1.name);
      let pos2 = arrayD.findIndex((x) => x.name === dish2.name);

      if (pos1 !== -1 && pos2 !== -1) {
        let temp = arrayD[pos1];
        arrayD[pos1] = arrayD[pos2];
        arrayD[pos2] = temp;
      } else {
        throw new NotAssignedException();
      }

      return this;
    }

    *getDishesInCategory(category, func = "") {
      if (!(category instanceof Category)) {
        throw new ObjecManagerException("category", "Category");
      }
      if (this.#categories.has(category.name)) {
        let array = [];
        for (const d of this.#dishes.values()) {
          if (d.categories.get(category.name)) {
            array.push(d.dish);
          }
        }
        if (func instanceof Function) {
          array.sort(func);
        }
        for (let d of array) {
          yield d;
        }
      } else {
        throw new CategoryNotExistException(category);
      }
    }

    *getDishesWithAllergen(allergen, func) {
      if (!(allergen instanceof Allergen)) {
        throw new ObjecManagerException("allergen", "Allergen");
      }

      if (this.#allergens.has(allergen.name)) {
        let array = [];
        for (const d of this.#dishes.values()) {
          if (d.allergens.get(allergen.name)) {
            array.push(d.dish);
          }
        }

        if (func instanceof Function) {
          console.log("ordena array allergen");
          array.sort(func);
        }

        for (let d of array) {
          yield d;
        }
      } else {
        throw new AllergenNotExistException(allergen);
      }
    }

    *findDishes(criterio, orden) {
      let array = [];
      for (let d of this.#dishes.values()) {
        if (criterio(d.dish)) array.push(d.dish);
      }
      if (orden) {
        array.sort(orden);
      }
      for (let d of array) {
        yield d;
      }
    }

    clear() {
      this.#dishes.clear();
      this.#categories.clear();
      this.#allergens.clear();
      this.#menus.clear();
      this.#restaurants.clear();
    }
  }

  function init() {
    const manager = new RestaurantsManager();
    Object.freeze(manager);
    return manager;
  }

  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
    Dish: Dish.name,
    Category: Category.name,
    Allergen: Allergen.name,
    Menu: Menu.name,
    Restaurant: Restaurant.name,
  };
})();

export { Dish, Category, Allergen, Restaurant, Menu, Coordinate };
export {
  BaseException,
  InvalidAccessConstructorException,
  EmptyValueException,
  InvalidValueException,
  ManagerException,
  ObjecManagerException,
  DishExistsException,
  CategoryExistsException,
  AllergenExistsException,
  MenuExistsException,
  RestaurantExistsException,
  DishNotExistException,
  CategoryNotExistException,
  AllergenNotExistException,
  MenuNotExistException,
  RestaurantNotExistException,
  NotAssignedException,
};

export default RestaurantsManager;
