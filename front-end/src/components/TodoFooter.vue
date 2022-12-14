<template>
    <div class="clearAllContainer">
        <span class="clearAllBtn" v-on:click="clearTodo">Clear All</span>
    </div>
</template>

<script>

export default {
    methods: {
        clearTodo() {
            if (!confirm("정말로 전부 삭제하시겠습니까?")) {
                return
            } else {
                console.log('삭제')
                this.$emit('clearTodo');
            }
        }
    }
}
</script>

<style scoped>
    .clearAllContainer {
        width: 8.5rem;
        height: 50px;
        line-height: 50px;
        background-color: white;
        border-radius: 5px;
        margin: 5rem auto 0;
    }
    
    .clearAllBtn {
        color: #e20303;
        display: block;
    }

</style>