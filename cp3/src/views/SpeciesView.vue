<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='species'/>
        <DataDisplay class='data' subset='species' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "SpeciesView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
