package com.recipe.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.recipe.dao.ShoppingListRepository;
import com.recipe.model.ShoppingList;

@RestController
@RequestMapping("/api")
public class ShoppingListController {
	@Autowired
	ShoppingListRepository shoppingListRepository;


	@RequestMapping("/shopping-list")
	public List<ShoppingList> getIngredients(){
		return (List<ShoppingList>) shoppingListRepository.findAll();
	}
	@PostMapping("/shopping-list")
	public ShoppingList addShoppingList(@RequestBody ShoppingList shoppingList) {
		return shoppingListRepository.save(shoppingList);
	}
	
	@PostMapping("/shopping-list/saveAll")
	public List<ShoppingList> addShoppingLists(@RequestBody List<ShoppingList> shoppingLists) {
		return (List<ShoppingList>) shoppingListRepository.saveAll(shoppingLists);
	}
	
	@PutMapping("/shopping-list/{id}")
	public ResponseEntity<ShoppingList> updateShoppingList(@PathVariable(value = "id") String id, @RequestBody ShoppingList shoppingList){
		shoppingList = shoppingListRepository.save(shoppingList);
		return ResponseEntity.ok().body(shoppingList);
	}
	@DeleteMapping("/shopping-list/{id}")
	public ResponseEntity<ShoppingList> deleteShoppingList(@PathVariable(value = "id") Long id){
		Optional<ShoppingList> shoppingList = shoppingListRepository.findById(id);
		if(shoppingList == null){
			return ResponseEntity.notFound().build();
		}
		shoppingListRepository.deleteById(id);
		return ResponseEntity.ok().build();
	}
}
