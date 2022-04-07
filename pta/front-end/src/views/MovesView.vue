<template>
    <div class='page'>
        <DataView subset='moves' :current='current'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "MovesView",
    components: {
        DataView,
    },
    props: {
        current: String,
    },
}
</script>

<style>
#name,
#type,
#damage,
#description {
    flex-basis: 100%;
}
</style>
