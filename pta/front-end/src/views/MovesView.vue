<template>
    <div class='page'>
        <DataView subset='moves' current='Test Move'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "MovesView",
    components: {
        DataView,
    },
    /* props: { */
    /*     current: Number, */
    /* }, */
}
</script>

<style>
</style>
