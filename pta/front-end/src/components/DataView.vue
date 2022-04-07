<template>
    <div class='data'>
        <div>
            <ToggleSelection :options='[ "View", "Edit", "Create" ]' default='View'
                @selected-view='formSelected = "view"'
                @selected-edit='formSelected = "edit"'
                @selected-create='formSelected = "create"'
            />

            <div v-if='!(formSelected === "create")'>
                <div v-for='item in focused' :key='item.name' class='focused field-container'>

                    <template v-for='field in dataFields'>
                        <div :id='field' :key='field' class='field'>
                            <div class='field-name'>
                                {{utils.titleCase(field)}}:
                            </div>

                            <div v-if='formSelected === "view"' class='field-value'>
                                {{Array.isArray(item[field]) ? item[field].join(', ') : item[field]}}
                            </div>
                            <div v-else-if='formSelected === "edit"' class='edit-box'>
                                <input v-model='editingData[field]'/>
                            </div>
                        </div>

                        <div :id='`${field}-after`' :key='field'></div>
                    </template>

                </div>
            </div>

            <div v-if='formSelected === "create"' class='field-container'>
                <div v-for='field in dataFields' :key='field' :id='field' class='field'>
                    <div class='field-name'>
                        {{utils.titleCase(field)}}:
                    </div>
                    <div class='create-box'>
                        <input v-model='creatingData[field]'/>
                    </div>
                </div>
            </div>

            <div v-if='formSelected === "edit"' class='submit-button'>
                <button type="button" @click='putEdit()'>Submit</button>
                <button type="button" @click='deleteOld()'>Delete</button>
            </div>
            <div v-else-if='formSelected === "create"' class='submit-button'>
                <button type="button" @click='postNew()'>Submit</button>
            </div>
        </div>

        <div v-if='formSelected === "view" || formSelected === "edit"' class='data-list'>
            <div v-for='item in data' :key='item.name' class='data-listing'>
                <router-link :to='`/${subset}/${item._id}`'>{{item.name}}</router-link>
            </div>
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
            data: [ ],
            editingData: { },
            creatingData: { },
            dataFields: fields[this.subset],
            formSelected: 'view',
        }
    },
    computed: {
        focused() {
            return this.data.filter(data => data._id === this.current);
        },
    },
    watch: {
        focused(val) {
            // TODO: check for arrays and properly handle them
            if (val.length)
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
        async deleteOld() {
            try {
                await axios.delete(`/api/${this.subset}/${this.editingData._id}`);
                this.getData();
                this.formSelected = 'view';
            } catch (error) {
                console.log(error);
            }
        }
    },
}
</script>

<style>
.data {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
}

.field-container {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
}

.field {
    border-style: solid;
    border-width: 2px;
    border-radius: 0.5em;
    border-color: #434c5e;
    padding: 0.5em;
    margin: 0.25em;
    background-color: #3b4252;
}

.data-list {
    margin-top: 2em;
}

input {
    width: 100%;
    color: #d8dee9;
    background-color: #4c566a;
    border-radius: 4px;
}
</style>
