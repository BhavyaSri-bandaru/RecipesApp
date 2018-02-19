package com.recipe.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "recipe")
public class Recipe {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long recipeID;
	
	@Column(name = "recipename")
	private String recipeName;
	
	@Column(name = "recipedescription")
	private String recipeDescription;
	
	@Column(name = "recipeimage")
	private String recipeImageURL;

	@OneToMany(mappedBy="recipeID",cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Ingredient> ingredients;

	

	public Long getRecipeID() {
		return recipeID;
	}

	public void setRecipeID(Long recipeID) {
		this.recipeID = recipeID;
	}

	public String getRecipeName() {
		return recipeName;
	}

	public void setRecipeName(String recipeName) {
		this.recipeName = recipeName;
	}

	public String getRecipeDescription() {
		return recipeDescription;
	}

	public void setRecipeDescription(String recipeDescription) {
		this.recipeDescription = recipeDescription;
	}

	public String getRecipeImageURL() {
		return recipeImageURL;
	}

	public void setRecipeImageURL(String recipeImageURL) {
		this.recipeImageURL = recipeImageURL;
	}

	@OneToMany(mappedBy="recipeID",cascade = CascadeType.ALL)
	public List<Ingredient> getIngredients() {
		return ingredients;
	}

	public void setIngredients(List<Ingredient> ingredients) {
		this.ingredients = ingredients;
	}
	
	
	
}
