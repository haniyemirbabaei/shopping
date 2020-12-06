import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Recipe } from './recipe.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service'
import { Subject } from 'rxjs/internal/Subject';


@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();
    // private recipes: Recipe[] = [
    //     new Recipe('test recipe1', 'this is a test recipe 1',
    //         'https://realfood.tesco.com/media/images/RFO-1400x919-AsianSalmon-9a9cf566-eaad-4107-aa79-886ec53e6b31-0-1400x919.jpg'
    //         , [
    //             new Ingredient('Meat', 2),
    //             new Ingredient('Potato', 5)
    //         ]),
    //     new Recipe('test recipe2', 'this is a test recipe 2', 'https://static01.nyt.com/images/2019/05/15/dining/14Iranian12/merlin_154114341_12fa2de3-d74f-493a-a351-85c51c223244-jumbo.jpg',
    //         [
    //             new Ingredient('Egg', 2),
    //             new Ingredient('Rice', 5)
    //         ])
    // ];
     private recipes:Recipe[]=[];
    setRecipes(recipes: Recipe[]) {
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }
    getRecipes() {
        return this.recipes.slice();
    }
    getRecipe(index: number) {
        return this.recipes[index];
    }
    constructor(private shoppingListService: ShoppingListService) { }
    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }
    addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
    }
    updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }
    deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
}