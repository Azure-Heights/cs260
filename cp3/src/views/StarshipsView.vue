<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='starships'/>
        <DataDisplay class='data' subset='starships' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "StarshipsView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
