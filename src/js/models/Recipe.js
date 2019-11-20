import axios from 'axios';
import { key } from '../config';

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe () {
		try {
			const res = await axios(`https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch(error) {
			console.log(error);
			alert('Something went wrong :(');
		}
	}

	calcTime() {
		//Assuming that we need 15 minutes for each 3 ingredients
		const numIng = this.ingredients.length;
		const periods = Math.ceil(numIng / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		const units = [...unitsShort, 'kg', 'g'];

		const newIngredients = this.ingredients.map(el => {
			// 1) Uniform units
			let ingredient = el;
			unitsLong.forEach((unit, i) => {
				ingredient = ingredient.replace(unit, unitsShort[i]);
			});

			// 2) Remove parenthesis
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			// 3) Parse ingredients into count, unit and ingredients
			const arrIng = ingredient.split(' ');
			const unitIndex = arrIng.findIndex(el2 => units.includes(el2)); // Se usa para encontrar la unidad en los ingredientes haciendo un loop en el array unitsShort y si alguno es true entonces retorna la posicion en la string de esa vaina.

			let objIng;
			if (unitIndex > -1) {
				// There is a unit
				// Ex. 1 4/2 cups, be [1, 4/2] cups --> eval(4+1/2) --> 4.5
				// Ex. 4 cups, be [4] cups.
				const arrCount = arrIng.slice(0, unitIndex);

				let count;
				if (arrCount.length === 1) {
					count = eval(arrIng[0].replace('-', '+'));
				} else {
					count = eval(arrIng.slice(0, unitIndex).join('+'));
				}

				objIng = {
					count,
					unit: arrIng[unitIndex],
					ingredient: arrIng.slice(unitIndex + 1).join(' ') //Join es para volverlo una String. y unitIndex es donde se encuentra la unidad. ex: 1 4/2 oz.
				}


			} else if (parseInt(arrIng[0], 10)) { // cuando es tipo 1 bread o 1 package, hay un numero pero no unidad tipo 1 3/4 cup
				// There is NO unit but the first element is a number
				objIng = {
					count: parseInt(arrIng[0], 10),
					unit: '',
					ingredient: arrIng.slice(1).join(' ')
				}

			} else if (unitIndex === -1) {
				// There is no unit
				objIng = {
					count: 1,
					unit: '',
					ingredient
				}
			}

			return objIng;
		});

		this.ingredients = newIngredients;
	}

	updateServings(type) {
		// Servings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		// Ingredients
		this.ingredients.forEach(ing => {
			ing.count *= (newServings / this.servings);
		});

		this.servings = newServings;
	}
}
