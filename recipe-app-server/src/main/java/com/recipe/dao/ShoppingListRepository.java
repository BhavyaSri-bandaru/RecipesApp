package com.recipe.dao;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.recipe.model.ShoppingList;

@Repository
public interface ShoppingListRepository extends CrudRepository<ShoppingList, Long>{

}
