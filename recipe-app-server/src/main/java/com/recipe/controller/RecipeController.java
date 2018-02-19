package com.recipe.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.dao.RecipeRepository;
import com.recipe.model.Ingredient;
import com.recipe.model.Recipe;

@RestController
@RequestMapping("/api")
public class RecipeController {
	
	@Autowired
	RecipeRepository recipeRepository;
	
	
	@RequestMapping("/recipes")
	public List<Recipe> getRecipes(){
		return (List<Recipe>) recipeRepository.findAll();
	}
	
	@PostMapping("/recipes")
	public Recipe addRecipe(@RequestBody Recipe recipe) {
		return recipeRepository.save(recipe);
		
	}
	
	@GetMapping("/recipes/{id}")
	public ResponseEntity<Optional<Recipe>> getRecipeById (@PathVariable(value = "id") Long id){
		Optional<Recipe> recipe = recipeRepository.findById(id);
		if(recipe == null){
			 return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok().body(recipe);
	}
	
	@PutMapping("/recipes/{id}")
	public ResponseEntity<Recipe> updateRecipe(@PathVariable(value = "id") Long id, @RequestBody Recipe recipe){
		setIngredientsDataForSave(recipe);
		recipe = recipeRepository.save(recipe);
		return ResponseEntity.ok().body(recipe);
	}
	
	private void setIngredientsDataForSave(Recipe recipe) {
		for(Ingredient ing : recipe.getIngredients()){
			ing.setRecipeID(recipe.getRecipeID());
		}
		
	}

	@DeleteMapping("/recipes/{id}")
	public ResponseEntity<Recipe> deleteRecipe(@PathVariable(value = "id") Long id){
		Optional<Recipe> recipe = recipeRepository.findById(id);
		if(recipe == null){
			return ResponseEntity.notFound().build();
		}
		recipeRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}

}
