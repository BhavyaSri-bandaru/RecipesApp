package com.recipe.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recipe.model.Recipe;

@Repository
public interface RecipeRepository extends CrudRepository<Recipe, Long>{

}
