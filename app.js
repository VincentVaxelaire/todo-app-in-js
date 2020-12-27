// 1. récupérer l'input pour ajouter des choses à faire :: 2. récuper le parent du template à mettre à l'intérieur de l'html :: 3.récupérer l'input d'un <form> class=search
const addTask = document.querySelector('.add'); // input type="text"
const tasksList = document.querySelector('.tasks'); // ex : une <div> ou une <ul>
const search = document.querySelector('.search input'); // écoute un input dans un form class=search

// 2. Template HTML de l'élément input à mettre dans l'HTML (utiliser ${...} pour récuper la valeur entrée dans l'input)
const taskTemplate = task => {
    const html = `
    <li class="list-group-item d-flex justify-content-between align-items-center">
        <span>${task}</span>
        <svg class="delete" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm7 14h-14v-4h14v4z"/>
        </svg>
    </li>
    `;
    tasksList.innerHTML += html;
};

// 1. écoute du submit avec prevent
addEventListener('submit', e => {
    e.preventDefault();
    // const = transforme la valeur input par l'élément à mettre dans la template
    const task = addTask.add.value.trim();
    // si l'input = au moins un carractère alors appel de la template et reset l'input
    if(task.length){
        taskTemplate(task);
        addTask.reset();
    };
});

// 2.1. supprimer un élément dans l'HTML en cliquant sur un icon / svg / ect
tasksList.addEventListener('click', e => {
    // si les enfants du parent écouté contiennent la class="delete" alors celui-ci est supprimmé de la page HTML.
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

// 3.1. rechercher un terme parmis le contenu d'un élément HTML 
const filterTasks = (term) => {
    Array.from(tasksList.children)
        .filter((task) => !task.textContent.includes(term))
        .forEach((task) => task.classList.add('filtered'));
    
    Array.from(tasksList.children)
        .filter((task) => task.textContent.includes(term))
        .forEach((task) => task.classList.remove('filtered'));
};

// 3. Quand la touche du clavier se relève la recherche s'actualise
search.addEventListener('keyup', () => {
    const term = search.value.trim();
    filterTasks(term);
});

// Ajouter cette class au CSS
// .filtered{
//     display: none !important;
// }

$