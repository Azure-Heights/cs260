<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='planets'/>
        <DataDisplay class='data' subset='planets' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "PlanetsView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
