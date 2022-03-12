<template>
    <div class='readout'>
        <div v-for='field in fields' :key='field'>
            <div class='field'>
                <span class='field-name'>{{utils.titleCase(field)}}: </span>
                <span v-if='Array.isArray(subdata[current][field])'>
                    <span v-for='entry in subdata[current][field]' :key='entry.url'>
                        <router-link :to='utils.constructViewPath(entry)'>
                            {{utils.pathLookup(data, entry).name}}, 
                        </router-link>
                    </span>
                </span>
                <span v-else>
                    <span v-if='isLink(subdata[current][field])'>
                        <router-link :to='utils.constructViewPath(subdata[current][field])'>
                            {{utils.pathLookup(data, subdata[current][field]).name}}, 
                        </router-link>
                    </span>
                    <span v-else>
                        {{subdata[current][field]}}
                    </span>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import data   from '../mock.js'
import utils  from '../utils.js'
import fields from '../fields.js'

export default {
    name: "DataDisplay",
    props: {
        subset: String,
        current: String,
    },
    computed: {
        utils() {
            return utils;
        },
        fields() {
            return fields[this.subset];
        },
        data() {
            return data;
        },
        subdata() {
            return data[this.subset];
        },
    },
    methods: {
        isLink(field) {
            if (typeof(field) == 'string' && field.search('/') > 0) {
                return true
            } else {
                return false
            }
        }
    },
}
</script>

<style scoped>
.readout {
    display: inline;
    margin: 0.5em;
    padding: 0.5em 0 0.5em 10px;
    background-color: rgba(43,43,43,0.33);
    border-style: solid;
    border-color: grey;
    border-radius: 16px;
    overflow: scroll;
}

.readout .field-name {
    color: lightgrey;
}

.readout .field {
    margin-bottom: 0.25em;
}
</style>
