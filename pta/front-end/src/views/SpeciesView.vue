<template>
    <div class='page'>
        <DataView subset='species' :current='current'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "SpeciesView",
    components: {
        DataView,
    },
    props: {
        current: String,
    },
}
</script>

<style>
#health {
    background-color: red !important;
}
</style>
