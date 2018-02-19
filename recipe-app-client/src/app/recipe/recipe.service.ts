import {Recipe} from './recipe.model';
import { Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';
import {HttpHeaders} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class RecipeService {
  // recipeSelected = new EventEmitter<Recipe>();
  private headers = new HttpHeaders({'Content-Type' : 'application/json'});
  private recipeURL = '/api/recipes/';
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = this.getRecipes();
  /*private recipes: Recipe[] = [
    new Recipe('A test recipe',
      'A simple test recipes',
      'https://upload.wikimedia.org/wikipedia/commons/1/11/Pindi-chana-recipe.jpg',
      [new Ingredient('chana', 100),
        new Ingredient('Onions', 2)]),
    new Recipe('Another test recipe',
      'A simple test recipes',
      'https://static.pexels.com/photos/236421/pexels-photo-236421.jpeg', [new Ingredient('Shrimp', 10),
        new Ingredient('chilli sauce', 1)])
  ];*/
    constructor( private slService: ShoppingListService, private httpClient: HttpClient) {}
    init() {
      this.httpClient.get(this.recipeURL).subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
         }
      );
     return this.recipes;
  }
  getRecipes() {
    this.httpClient.get(this.recipeURL).subscribe(
      (data: Recipe[]) => {
        this.recipes = data;
        }
    );
    return this.recipes;
  }

  getRecipeList() {
      return this.httpClient.get(this.recipeURL);
  }

  /*getRecipes() {
    return this.recipes.slice();
  }*/
  getRecipe(index: number) {
    return this.recipes[index];
  }
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }
  addRecipe(recipe: Recipe) {
   this.httpClient.post(this.recipeURL, JSON.stringify(recipe), {headers: this.headers})
      .subscribe(
        (data: Recipe) => {
          this.recipes.push(data);
          this.recipesChanged.next(this.recipes.slice());
        }
      );
    }
  /*addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }*/
 /* updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }*/
  /*deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());

  }*/
  updateRecipe(index: number, newRecipe: Recipe) {
    const rcp = this.recipes[index];
    newRecipe.recipeID = rcp.recipeID;
    const url = this.recipeURL + newRecipe.recipeID;
    this.httpClient.put(url, JSON.stringify(newRecipe), {headers: this.headers})
      .subscribe(
        (data: Recipe) => {
          this.recipes[index] = data;
          this.recipesChanged.next(this.recipes.slice());
        }
      );
  }

  deleteRecipe(index: number) {
    const rcp = this.recipes[index];
    const url = this.recipeURL + rcp.recipeID;
    this.httpClient.delete(url, {headers: this.headers})
      .subscribe(
        (data: Recipe) => {
          this.recipes.splice(index, 1);
          this.recipesChanged.next(this.recipes.slice());
        }
      );
      }
}
