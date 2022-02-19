const apiRoot = 'https://swapi.dev/api/';

var data = { };

var loadData;          // ()
var populateCatalog;   // ()
var customLinkOnClick; // ()

var splitPath;   // ()
var pathLookup;  // ()
var titleCase;   // ()
var intersperse; // ()

var text;           // ()
var element;        // ()
var div;            // ()
var link;           // ()
var expand;         // ()
var display;        // ()
var letElementById; // ()

var peopleFields    = [ 'name', 'gender', 'species', 'birth_year', 'eye_color', 'hair_color', 'skin_color', 'homeworld', 'films' ];
var planetsFields   = [ 'name', 'climate', 'terrain', 'gravity', 'population', 'residents', 'films' ];
var filmsFields     = [ 'title', 'episode_id', 'director', 'producer', 'release_date', 'characters', 'planets' ];
var speciesFields   = [ 'name', 'classification', 'designation', 'average_height', 'average_lifespan', 'homeworld', 'language', 'people' ];
var vehiclesFields  = [ 'name', 'model', 'manufacturer', 'cost_in_credits', 'crew', 'vehicle_class', 'pilots', 'films' ];
var starshipsFields = [ 'name', 'model', 'manufacturer', 'cost_in_credits', 'crew', 'passengers', 'hyperdrive_rating', 'starship_class', 'pilots', 'films' ];


window.onload = async function() {
    let catalog = document.getElementById('catalog');

    let banner = document.getElementById('banner');
    let bannerText = banner.innerHTML;
    banner.innerHTML = 'Loading data, please wait...';

    loadData().then(function() {
        banner.innerHTML = bannerText;
        catalog.style.display = 'initial';
        populateCatalog();
    });
}


/* app functions */

loadData = async function() {
    const loadPage = function (currentPage, endpoint) {
        for (let obj of currentPage.results) {
            const path = splitPath(obj.url);
            data[endpoint][path.index] = obj;
            data[endpoint][path.index].type = path.type;
        }
    }

    const endpoints = await (await fetch(apiRoot)).json();
    for (const [endpoint, url] of Object.entries(endpoints)) {
        data[endpoint] = [ ];

        let currentPage = await (await fetch(url)).json();
        loadPage(currentPage, endpoint);

        // while (currentPage.next != null) {
        //     currentPage = await (await fetch(currentPage.next)).json();
        //     loadPage(currentPage, endpoint);
        // }
    }

    for (let i = 0; i < data.films.length; i++)
        data.films[i].name = data.films[i].title;
}

populateCatalog = function() {
    letElementById('catalog', [
        div([ 'content-title', 'accent-text' ], text('ENTRY CATALOG')),
        div('prompt', text('Click a category to expand.')),

        Object.entries(data).map((type, idx) =>
            div('catalog-section', [
                expand('expand-' + idx, [
                    div('catalog-section-title', text('' + titleCase(type[0]))),
                    div('catalog-section-content', type[1].map(entry =>
                        div('catalog-entry',
                            link(entry.url, customLinkOnClick, 'catalog-entry', text(entry.name)))))
                ])
            ])
        )
    ]);
}

customLinkOnClick = function() {
    event.preventDefault();

    const path = splitPath(this.href);
    const entry = data[path.type][path.index];

    document.getElementById('main-view').style.display = 'initial';
    letElementById('main-view', [
        div([ 'content-title', 'accent-text' ], text('DATA READOUT')),
        display(entry)
    ]);
}


/* display behavior */

function parseField(field) {
    if (Array.isArray(field)) {
        inter = intersperse(field.map(field => parseField(field)), () => text(', '));
        console.log(inter);
        return inter;
    }
    if (typeof(field) != 'string' || field.search('/api') < 0)
        return text(field);
    else
        return link(field, customLinkOnClick, null, text(pathLookup(field).name));
}

function display(entry) {
    const elem = div('readout',
        globalThis[entry.type + 'Fields'].map(field =>
            div('field', [
                span('field-name', titleCase(field) + ': '),
                parseField(entry[field])
            ])
        )
    );

    return elem;
}

/* utility functions */

function splitPath(pathString) {
    const path = pathString.slice(pathString.search('/api') + 5, -1).split('/');
    return { type: path[0], index: parseInt(path[1]) - 1 };
}

function pathLookup(pathString) {
    const path = splitPath(pathString);
    return data[path.type][path.index];
}

function titleCase(toMatch) {
    var result = toMatch
        .replace(/_/g, ' ')
        .replace(/(\w)(\w*)/g, function (_, i, r) {
            return i.toUpperCase() + (r != null ? r : '');
        })

    return result;
}

function intersperse(array, func) {
    let acc = [ ];

    for (let i = 0; i < array.length; i++) {
        acc.push(array[i]);
        if (i != array.length - 1)
            acc.push(func(i, array[i]));
    }

    return acc;
}

function addRecClassList(elem, classList) {
    if (Array.isArray(classList))
        for (let cls of classList)
            addRecClassList(elem, cls);
    else if (classList != null && classList != undefined)
        elem.classList.add(classList);
}

function addRecChildList(elem, childList) {
    if (Array.isArray(childList))
        for (let child of childList)
            addRecChildList(elem, child);
    else if (childList != null && childList != undefined)
        elem.appendChild(childList);
}

function text(content) {
    return document.createTextNode(content);
}

function element(type, classList, childList) {
    let elem = document.createElement(type);

    addRecClassList(elem, classList);
    addRecChildList(elem, childList);

    return elem;
}

function div(classList, childList) {
    return element('div', classList, childList);
}

function span(classList, content) {
    return element('span', classList, text(content));
}

function link(href, onclick, classList, childList) {
    let elem = element('a', classList, childList);
    elem.href = href;
    elem.onclick = onclick;

    return elem;
}

function expand(id, childList) {
    let input = element('input', null, null);
    input.type = 'checkbox';
    input.id = id;

    let label = element('label', null, childList);
    label.htmlFor = id;

    return [ input, label ];
}

function letElementById(id, childList) {
    const elem = document.getElementById(id);
    elem.innerHTML = '';
    addRecChildList(elem, childList);

    return elem;
}

