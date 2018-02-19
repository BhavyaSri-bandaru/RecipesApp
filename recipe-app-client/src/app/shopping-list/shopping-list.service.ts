import {Ingredient} from '../shared/ingredient.model';
// import {EventEmitter} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Recipe} from '../recipe/recipe.model';
 import {Injectable} from '@angular/core';
import 'rxjs/add/operator/toPromise';
import {forEach} from '@angular/router/src/utils/collection';


@Injectable()
export class ShoppingListService {
  // ingredientsChanged = new EventEmitter<Ingredient[]>();
  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private shoppinglistURL = '/api/shopping-list/';
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = this.getIngredients();
  startedEditing = new Subject<number>();
// private ingredients: Ingredient[] = [
  //  new Ingredient('Apples', 20),
  //   new Ingredient('Tomatoes', 10)
//  ];
  constructor(private httpClient: HttpClient) {
  }

  init() {
    this.httpClient.get(this.shoppinglistURL).subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
    return this.ingredients;
  }
  getIngredients() {
    this.httpClient.get(this.shoppinglistURL).subscribe(
      (data: Ingredient[]) => {
        this.ingredients = data;
      }
    );
    return this.ingredients;
  }
   // return this.ingredients.slice();
 getIngredient(index: number) {
    return this.ingredients[index];
 }
 addIngredient(ingredient: Ingredient) {
  this.httpClient.post(this.shoppinglistURL, JSON.stringify(ingredient), {headers: this.headers})
    .subscribe(
      (data: Ingredient) => {
        this.ingredients.push(data);
        this.ingredientsChanged.next(this.ingredients.slice());
        // this.ingredients.push(ingredient);
        // this.ingredientsChanged.emit(this.ingredients.slice());
        //  this.ingredientsChanged.next(this.ingredients.slice());
      }
    );
}


addIngredients(ingredients: Ingredient []) {
    const url = this.shoppinglistURL + '/saveAll';
    this.httpClient.post(url, JSON.stringify(ingredients), {headers: this.headers})
    .subscribe(
      (data: Ingredient[]) => {
        data.forEach(item => {
          this.ingredients.push(item);
        });
        this.ingredientsChanged.next(this.ingredients.slice());
   // for (let ingredient of ingredients){
    //  this.addIngredient(ingredient);
  // }
  // this.ingredients.push(...ingredients);
   // this.ingredientsChanged.emit(this.ingredients.slice());
        // this.ingredientsChanged.next(this.ingredients.slice());
 }
    );
}

// updateIngredient(index: number, newIngredient: Ingredient){
//   this.ingredients[index] = newIngredient;
 //  this.ingredientsChanged.next(this.ingredients.slice());

// }
// deleteIngredient(index: number){
//   this.ingredients.splice(index,1);
//   this.ingredientsChanged.next(this.ingredients.slice());
// }

//}


updateIngredient(index: number, newIngredient: Ingredient) {
  const ing = this.ingredients[index];
  newIngredient.id = ing.id;
  const url = this.shoppinglistURL + newIngredient.id;
  this.httpClient.put(url, JSON.stringify(newIngredient), {headers: this.headers})
    .subscribe(
      (data: Ingredient) => {
        this.ingredients[index] = data;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    );
}

deleteIngredient(index: number) {
  const ing = this.ingredients[index];
  const url = this.shoppinglistURL + ing.id;
  this.httpClient.delete(url, {headers: this.headers})
    .subscribe(
      (data: Ingredient) => {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    );
}

private handleError(error: any): Promise<any> {
  return Promise.reject(error.message || error);
}
}
