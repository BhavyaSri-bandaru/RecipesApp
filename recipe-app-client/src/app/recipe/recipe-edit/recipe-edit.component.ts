import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe.model';
@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number;
editMode = false;
recipeForm: FormGroup;
  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
  .subscribe(
(params: Params) => {
  this.id = +params['id'];
  this.editMode = params['id'] != null;
  this.initForm();
  }
  );
}
onSubmit() {
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
     // this.recipeForm.value['description'],
    //  this.recipeForm.value[imagePath],
     // this.recipeForm.value['ingredients']);
if (this.editMode) {
  this.recipeService.updateRecipe(this.id, this.recipeForm.value);
} else {
  console.log('in component add recipe');
  this.recipeService.addRecipe(this.recipeForm.value);
}
this.onCancel();
}

onAddIngredient() {
  (<FormArray>this.recipeForm.get('ingredients')).push(
    new FormGroup({
      'ingredientName': new FormControl(null, Validators.required),
      'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  );
}
onDeleteIngredient(index: number) {
  (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);

}
onCancel() {
this.router.navigate(['../'], {relativeTo: this.route});
}

get formData() { return <FormArray>this.recipeForm.get('ingredients'); }



private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);
    if (this.editMode) {
      const recipe: Recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.recipeName;
      recipeImagePath = recipe.recipeImageURL;
      recipeDescription = recipe.recipeDescription;
      console.log(recipe.ingredients, 'edit mode');
      if (recipe.ingredients) {
        for (const ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'ingredientName': new FormControl(ingredient.ingredientName, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            } )
          );
        }
      }
    }
this.recipeForm = new FormGroup({
  'recipeName': new FormControl(recipeName, Validators.required),
  'recipeImageURL': new FormControl(recipeImagePath, Validators.required),
  'recipeDescription': new FormControl(recipeDescription, Validators.required),
  'ingredients': recipeIngredients
});
}
}
