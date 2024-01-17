/* eslint-disable max-classes-per-file */
class BaseException extends Error {
  constructor(message = "", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "BaseException";
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BaseException);
    }
  }
}

// Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
  constructor(fileName, lineNumber) {
    super("Constructor can’t be called as a function.", fileName, lineNumber);
    this.name = "InvalidAccessConstructorException";
  }
}

// Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
  constructor(param, fileName, lineNumber) {
    super(
      `Error: The parameter ${param} can't be empty.`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "EmptyValueException";
  }
}

// Excepción de valor inválido
class InvalidValueException extends BaseException {
  constructor(param, value, fileName, lineNumber) {
    super(
      `Error: The paramenter ${param} has an invalid value. (${param}: ${value})`,
      fileName,
      lineNumber
    );
    this.param = param;
    this.name = "InvalidValueException";
  }
}

class ManagerException extends BaseException {
  constructor(message = "Error: Manager Exception.", fileName, lineNumber) {
    super(message, fileName, lineNumber);
    this.name = "ManagerException";
  }
}

class ObjecManagerException extends ManagerException {
  constructor(param, className, fileName, lineNumber) {
    super(`Error: The ${param} is not a ${className}`, fileName, lineNumber);
    this.param = param;
    this.param = className;
    this.name = "ObjecManagerException";
  }
}

class DishExistsException extends ManagerException {
  constructor(dish, fileName, lineNumber) {
    super(
      `Error: The ${dish.name} already exists in the manager.`,
      fileName,
      lineNumber
    );
    this.dish = dish;
    this.name = "DishExistsException";
  }
}

class CategoryExistsException extends ManagerException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: The ${category.name} already exists in the manager.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryExistsException";
  }
}

class AllergenExistsException extends ManagerException {
  constructor(allergen, fileName, lineNumber) {
    super(
      `Error: The ${allergen.name} already exists in the manager.`,
      fileName,
      lineNumber
    );
    this.allergen = allergen;
    this.name = "AllergenExistsException";
  }
}

class MenuExistsException extends ManagerException {
  constructor(menu, fileName, lineNumber) {
    super(
      `Error: The ${menu.name} already exists in the manager.`,
      fileName,
      lineNumber
    );
    this.menu = menu;
    this.name = "MenuExistsException";
  }
}

class RestaurantExistsException extends ManagerException {
  constructor(restaurant, fileName, lineNumber) {
    super(
      `Error: The ${restaurant.name} already exists in the manager.`,
      fileName,
      lineNumber
    );
    this.restaurant = restaurant;
    this.name = "RestaurantExistsException";
  }
}

class DishNotExistException extends ManagerException {
  constructor(dish, fileName, lineNumber) {
    super(
      `Error: The ${dish.name} doesn't exist in the manager.`,
      fileName,
      lineNumber
    );
    this.dish = dish;
    this.name = "DishNotExistException";
  }
}

class CategoryNotExistException extends ManagerException {
  constructor(category, fileName, lineNumber) {
    super(
      `Error: The ${category.name} doesn't exist in the manager.`,
      fileName,
      lineNumber
    );
    this.category = category;
    this.name = "CategoryNotExistException";
  }
}

class AllergenNotExistException extends ManagerException {
  constructor(allergen, fileName, lineNumber) {
    super(
      `Error: The ${allergen.name} doesn't exist in the manager.`,
      fileName,
      lineNumber
    );
    this.allergen = allergen;
    this.name = "AllergenNotExistException";
  }
}

class MenuNotExistException extends ManagerException {
  constructor(menu, fileName, lineNumber) {
    super(
      `Error: The ${menu.name} doesn't exist in the manager.`,
      fileName,
      lineNumber
    );
    this.menu = menu;
    this.name = "MenuNotExistException";
  }
}

class RestaurantNotExistException extends ManagerException {
  constructor(restaurant, fileName, lineNumber) {
    super(
      `Error: The ${restaurant.name} doesn't exist in the manager.`,
      fileName,
      lineNumber
    );
    this.restaurant = restaurant;
    this.name = "RestaurantNotExistException";
  }
}

class AssignedException extends ManagerException {
  constructor(fileName, lineNumber) {
    super(`Error: The objects are assigned already.`, fileName, lineNumber);
    this.name = " AssignedException";
  }
}

class NotAssignedException extends ManagerException {
  constructor(fileName, lineNumber) {
    super(`Error: The objects are not assigned.`, fileName, lineNumber);
    this.name = " NotAssignedException";
  }
}

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
