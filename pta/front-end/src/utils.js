export default {
    titleCase(toMatch) {
        var result = toMatch
            .replace(/_/g, ' ')
            .replace(/(\w)(\w*)/g, function (_, i, r) {
                return i.toUpperCase() + (r != null ? r : '');
            })

        return result;
    },
}
