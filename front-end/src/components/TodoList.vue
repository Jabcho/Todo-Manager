<template>
    <section>
        <!--p class="test">{{ $store.state.mainStore.todoItems }}</!--p-->
        <div v-if="todoItems.length == 0" class="nolist">
            <p>아직 목록이 없습니다. 목록을 추가해 주세요.</p>
        </div>
        <ul v-if="todoItems.length > 0">
            <li class="shadow moving" v-for="todoItem in todoItems" v-bind:key="todoItem">
                <i class="checkBtn fas fa-check" aria-hidden="true"></i>
                    {{ todoItem.list }}
                <span class="removeBtn" type="button" v-on:click="removeTodo(todoItem.id)">
                    <i class="far fa-trash-alt" aria-hidden="true"></i>
                </span>
            </li>
        </ul>
    </section>
</template>

<script>

export default {
    //props: ['propsdata'],
    computed: {
        todoItems: function ()  {
            return this.$store.state.mainStore.todoItems;
        }
    },
    methods: {
        removeTodo: function(id, list){
            console.log(id, '실행');
            this.$emit('removeTodo', {
                id: id,
                list: list
            })
        },
    }
}
</script>

<style scoped>
    .nolist{
        background: rgb(255, 255, 255);
        height: 5rem;
        margin: 1rem 0;
        padding-top: 1.7rem;
        border-radius: 5px;
    }
    /*
    .list-enter-active, .list-leave-active {
        transition: all 1s;
    }
    .list-enter, .list-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
    */
    ul {
        list-style-type: none;
        padding-left: 0px;
        margin-top: 0;   
        text-align: left;

    }
    li {
        display: flex;
        min-height: 50px;
        height: 50px;
        line-height: 50px;
        margin: 0.5rem 0;
        padding: 0 0.9rem;
        background: white;
        border-radius: 5px;
    }
    .moving {
        transition: all 2s;
        transform: translateY(30px);
    }
    .checkBtn {
        line-height: 45px;
        color: #62acde;
        margin-right: 5px;
    }
    .removeBtn {
        margin-left: auto;
        color: #de4343;
    }
    
</style>