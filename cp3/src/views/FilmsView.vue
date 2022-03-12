<template>
    <div class='page'>
        <SelectionMenu class='menu' subset='films'/>
        <DataDisplay class='data' subset='films' :current='current'/>
    </div>
</template>

<script>
import SelectionMenu from '../components/SelectionMenu.vue'
import DataDisplay   from '../components/DataDisplay.vue'

export default {
    name: "FilmsView",
    components: {
        SelectionMenu,
        DataDisplay,
    },
    props: {
        current: Number,
    },
}
</script>
