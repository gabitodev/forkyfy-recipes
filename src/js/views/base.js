export const elements = {
	searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    searchRes: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shopping: document.querySelector('.shopping__list'),
    likesMenu: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list')
}

export const elementsStrings = {
	loader: 'loader'  //ESTA ES LA CLASE DEL LOADER EN CSS POR ESO PONGO ESO
};

export const renderLoader = parent => {
	const loader = `
		<div class="${elementsStrings.loader}">
			<svg>
				<use href="img/icons.svg#icon-cw"></use>
			</svg>
		</div>
	`;
	parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearLoader = () => {
	const loader = document.querySelector(`.${elementsStrings.loader}`); //Es la clase enssss
	if (loader) loader.parentElement.removeChild(loader); // BORRO EL BICHO GIRANDO
};