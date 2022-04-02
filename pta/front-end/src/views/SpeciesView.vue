<template>
    <div class='page'>
        <DataView subset='species' current='Milotic'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "SpeciesView",
    components: {
        DataView,
    },
    /* props: { */
    /*     current: Number, */
    /* }, */
}
</script>

<style>
#health {
    background-color: red !important;
}
</style>
