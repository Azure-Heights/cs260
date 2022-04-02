<template>
    <div>
        <div class='btn-group'>
            <button type="button" 
                v-for='(val, key) in options'
                :key='key'
                @click='changeOption(key)'
                :class="['btn', { 'btn-primary': selected === key, 'btn-default': selected !== key }]"
            >{{ val }}</button>
  </div>
    </div>
</template>

<script>
export default {
    name: "ToggleSelection",
    props: {
        options: Array,
        default: String,
    },
    data() {
        return {
            selected: this.default
        }
    },
    methods: {
        changeOption(value) {
            this.selected = value;
            this.$emit('selected-' + this.options[value].toLowerCase());
        }
    },
}
</script>

<style scoped>
</style>
