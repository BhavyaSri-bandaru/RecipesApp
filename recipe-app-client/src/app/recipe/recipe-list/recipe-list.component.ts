import { Component, OnInit, OnDestroy} from '@angular/core';
import {Recipe} from '../recipe.model';
import {RecipeService} from '../recipe.service';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {HttpResponse} from '@angular/common/http';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {
subscription: Subscription;
recipes: Recipe[] ;
errorMessage: '';
  constructor(private recipeService: RecipeService,
               private router: Router,
             private route: ActivatedRoute) {
    console.log('inside recipe list component');
    this.recipeService.getRecipes();
    this.recipeService.getRecipeList()
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
        }
      );
    }

  ngOnInit() {
   this.subscription =  this.recipeService.recipesChanged
      .subscribe(
        (recipes: Recipe[]) => {
          this.recipes = recipes;
        }
      );
    /*this.recipes = this.recipeService.getRecipes();*/

    this.recipes =  this.recipeService.getRecipes();
    /* .subscribe(recipes => {
        this.recipes = recipes;
      }, error => this.errorMessage = <any>error);*/

  }
  onNewRecipe() {
this.router.navigate(['new'], {relativeTo: this.route});
  }
ngOnDestroy() {
this.subscription.unsubscribe();
}
}
