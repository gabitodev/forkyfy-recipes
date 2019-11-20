import uniqid from 'uniqid';

export default class List {
	constructor() {
		this.items = [];
	}

	addItem(count, unit, ingredient) {
		const item = {
			id: uniqid(),
			count,
			unit,
			ingredient
		}
		this.items.push(item);
		return item;
	}

	deleteItem(id) {
		const index = this.items.findIndex(el => el.id === id);
		// [2,4,8] splice(1(posicion del array),2(cuantos elementos toma del aray)) -> returns 4, the original array is [2]
		// [2,4,8] slice(1(posicion de inicio),2(posicion final)) -> returns 4, the original array is [2,4,8]
		this.items.splice(index, 1);
	}

	updateCount(id, newCount) {
		this.items.find(el => el.id === id).count = newCount; //Encontrar el elemento "find()";
	}
}