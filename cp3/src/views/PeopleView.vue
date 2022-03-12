<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='people'/>
        <DataDisplay class='data' subset='people' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "PeopleView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
