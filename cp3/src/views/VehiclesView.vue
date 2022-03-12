<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='vehicles'/>
        <DataDisplay class='data' subset='vehicles' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "VehiclesView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
