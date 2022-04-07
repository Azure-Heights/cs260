<template>
    <div class='page'>
        <DataView subset='species' :current='current'/>
    </div>
</template>

<script>
import DataView from '../components/DataView.vue'

export default {
    name: "SpeciesView",
    components: {
        DataView,
    },
    props: {
        current: String,
    },
}
</script>

<style>
.field-container {
    flex-direction: row !important;
}

#name,
#types,
#description,
#abilities,
#moves {
    flex-basis: 100%;
}

#health,
#attack,
#defense,
#special_attack,
#special_defense,
#speed {
    flex: 1;
    color: black;
}

#health input,
#attack input,
#defense input,
#special_attack input,
#special_defense input,
#speed input {
    background-color: white;
}

#health-after,
#defense-after,
#special_defense-after {
    flex-basis: 100%;
    height: 0;
}

#health {
    background-color: #ff5959;
}

#attack {
    background-color: #f5ac78;
}

#defense {
    background-color: #fae078;
}

#special_attack {
    background-color: #9db7f5;
}

#special_defense {
    background-color: #a7d88d;
}

#speed {
    background-color: #fa92b2;
}
</style>
