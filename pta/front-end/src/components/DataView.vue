<template>
    <div class='data'>
        <ToggleSelection :options='[ "View", "Edit", "Create" ]' default='View'
            @selected-view='formSelected = "view"'
            @selected-edit='formSelected = "edit"'
            @selected-create='formSelected = "create"'
        />

        <div v-for='item in focused' :key='item.name' class='focused'>

            <div v-for='field in dataFields' :key='field' :id='field' class='field'>
                <div class='field-name'>
                    {{utils.titleCase(field)}}:
                </div>

                <div v-if='formSelected === "view"' class='field-value'>
                    {{Array.isArray(item[field]) ? item[field].join(', ') : item[field]}}
                </div>
                <div v-else-if='formSelected === "edit"' class='edit-box'>
                    <input v-model='editingData[field]'/>
                </div>
                <div v-else-if='formSelected === "create"' class='create-box'>
                    <input v-model='creatingData[field]'/>
                </div>

            </div>

        </div>

        <div v-if='formSelected === "view"' class='data-list'>
            <div v-for='item in data' :key='item.name' class='data-listing'>
                {{item.name}}
            </div>
        </div>
        <div v-else-if='formSelected === "edit"' class='submit-button'>
            <button type="button" @click='putEdit()'>Submit!</button>
        </div>
        <div v-else-if='formSelected === "create"' class='submit-button'>
            <button type="button" @click='postNew()'>Submit!</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import fields from '../fields.js'
import utils from '../utils.js'

import ToggleSelection from '../components/ToggleSelection.vue'

export default {
    name: "DataView",
    components: {
        ToggleSelection,
    },
    props: {
        subset: String,
        current: String,
    },
    data () {
        return {
            utils: utils,
            // TODO: remove this
            console: console,
            data: [ ],
            editingData: { },
            creatingData: { },
            dataFields: fields[this.subset],
            formSelected: 'view',
        }
    },
    computed: {
        focused() {
            return this.data.filter(data => data.name == this.current);
        },
    },
    watch: {
        focused(val) {
            // TODO: check for arrays and properly handle them
            this.editingData = JSON.parse(JSON.stringify(val[0]));
        },
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                let response = await axios.get(`/api/${this.subset}`);
                this.data = response.data;
                return true;
            } catch (error) {
                console.log(error);
            }
        },
        async putEdit() {
            try {
                await axios.put(`/api/${this.subset}/${this.editingData._id}`, this.editingData);
                this.getData();
                this.formSelected = 'view';
            } catch (error) {
                console.log(error);
            }
        },
        async postNew() {
            try {
                await axios.post(`/api/${this.subset}`, this.creatingData);
                this.getData();
                this.formSelected = 'view';
            } catch (error) {
                console.log(error);
            }
        },
    },
}
</script>

<style scoped>
.field {
    border-style: solid;
    border-width: 2px;
    border-radius: 0.5em;
    margin: 0.5em;
    padding: 0.25em;
}

.data-list {
    margin-top: 2em;
}

input {
    width: 100%;
}
</style>
