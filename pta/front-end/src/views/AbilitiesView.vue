<template>
    <div class='page'>
        <DataView subset='abilities' current='Swift Swim'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "AbilitiesView",
    components: {
        DataView,
    },
    /* props: { */
    /*     current: Number, */
    /* }, */
}
</script>
