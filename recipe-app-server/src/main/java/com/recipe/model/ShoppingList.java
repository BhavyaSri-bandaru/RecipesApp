package com.recipe.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "shoppinglist")
public class ShoppingList {
	@Id
	@Column(name = "shoppinglistid")
	@GeneratedValue(strategy=GenerationType.AUTO)
	private Long id;
	@Column(name = "ingredientname")
	private String ingredientName;
	@Column(name = "ingredientquantity")
	private int amount;

	public ShoppingList() {
		super();
	}

	public ShoppingList(Long id, String ingredientName, int amount) {
		super();
		this.id = id;
		this.ingredientName = ingredientName;
		this.amount = amount;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIngredientName() {
		return ingredientName;
	}

	public void setIngredientName(String ingredientName) {
		this.ingredientName = ingredientName;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
}
