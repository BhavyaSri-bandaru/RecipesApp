import {Ingredient} from '../shared/ingredient.model';
export class Recipe {
  public recipeID: number;
  public recipeName: string;
  public recipeDescription: string;
  public recipeImageURL: string;
  public ingredients: Ingredient[];

  constructor(id: number, name: string, description: string, imagePath: string, ingredients: Ingredient[]) {
    this.recipeID = id;
    this.recipeName = name;
    this.recipeDescription = description;
    this.recipeImageURL = imagePath;
    this.ingredients = ingredients;
  }
}
