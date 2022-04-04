<template>
    <div class='page'>
        <DataView subset='abilities' :current='current'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "AbilitiesView",
    components: {
        DataView,
    },
    props: {
        current: String,
    },
}
</script>
