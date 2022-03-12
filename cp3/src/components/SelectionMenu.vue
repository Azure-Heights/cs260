<template>
    <div class='catalog'>
        <div class='catalog-section'>
            <div class='catalog-section-title'>
                {{utils.titleCase(subset)}}
            </div>
            <div v-for='entry in menu' :key='entry.url'>
                <router-link :to='utils.constructViewPath(entry.url)'>
                    {{utils.pathLookup(data, entry.url).name}}, 
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import data from '../mock.js'
import utils from '../utils.js'

export default {
    name: "SelectionMenu",
    props: {
        subset: String
    },
    computed: {
        utils() {
            return utils;
        },
        data() {
            return data;
        },
        menu() {
            return (this.subset != '' ? data[this.subset] : data).filter((entry) => entry != null);
        },
    },
}
</script>

<style scoped>
.catalog {
    margin: 0.5em;
    padding: 0.5em 1em 0.5em 10px;
    background-color: rgba(43,43,43,0.33);
    border-style: solid;
    border-color: grey;
    border-radius: 16px;
    overflow: scroll;
}

.catalog-section input {
    display: none;
}

input + label .catalog-section-content {
    display: none;
}

input:checked + label .catalog-section-content {
    display: initial;
}

.catalog-section-title {
    margin: 0.25em;
    color: lightgrey;
}
</style>
