export default {
    titleCase(toMatch) {
        var result = toMatch
            .replace(/_/g, ' ')
            .replace(/(\w)(\w*)/g, function (_, i, r) {
                return i.toUpperCase() + (r != null ? r : '');
            })

        return result;
    },
    splitPath(pathString) {
        const path = pathString.split('/');
        return { type: path[0], index: parseInt(path[1]) - 1 };
    },
    constructViewPath(pathString) {
        const path = this.splitPath(pathString);
        return '/' + path.type + '/' + path.index;
    },
    pathLookup(data, pathString) {
        const path = this.splitPath(pathString);
        return data[path.type][path.index];
    },
}
