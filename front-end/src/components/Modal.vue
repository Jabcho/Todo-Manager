<template>
    <div class="modal-area">
        <div class="modal-container shadow">   
            <div class="modal-header">
                <span class="date"><slot name="date"></slot></span>
                <span class="closeBtn" @click="closeModal">X</span>
            </div>
            <div class="modal-body">
                <!--calendar에서 props로 일정 받아 띄우기-->
                <div class="modal-body-content">
                    <slot name="schedules"></slot>
                </div>
                <!--아래에는 +버튼-->
                <i class="addScheduleBtn fas fa-plus" aria-hidden="true" @click="openInput"></i>
                <div class="inputBox shadow" v-if="InputArea === true">
                    <input type="text" v-model="newSchedule" @input="$emit('update:modelValue', newSchedule)" v-on:keyup.enter="addSchedule" placeholder="Type what you have to do">
                    <span class="addContainer" @click="addSchedule">
                        <i class="addBtn fas fa-plus" aria-hidden="true"></i>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modelValue','InputArea'],
    emits: ['update:modelValue'],
    data: function() {
        return {
            modalOpen: false,
            //inputArea: false, // add버튼 누르면 나타나도록 
            newSchedule: this.modelValue
        }
    },
    methods: {
        closeModal() {
            this.$emit('closeModal');
            //this.modalOpen = false;
        },
        openInput() {
            console.log('선택');
            this.$emit('openInput');
        },
        addSchedule() {
            console.log('선택이');
            this.$emit('addSchedule')
            this.newSchedule = ""
        }
    }
}

</script>

<style lang="scss" scoped>
    .modal-area {
        font-family: Airal, Helvetica Neue, Helvetica, sans-serif;
        z-index: 999;
        display: flex;
        position: fixed;
        align-items: center;
        justify-content: center;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba($color: #000000, $alpha: 0);

        .modal-container {
            background: white;
            max-width: 320px;
            width: 100%;
            border-radius: 10px;
            height: 50%;

            .modal-header {
                box-sizing: border-box;
                display: flex;
                justify-content: space-between;
                background: #bfbfc4;
                width: 100%;
                padding: 0.5rem 0.9rem 0.2rem 0.9rem;
                border-radius: 10px 10px 0 0;
                color:#313030;

                .closeBtn:hover {
                    cursor: pointer;
                }
            }

            .modal-body {
                padding: 1rem;

                .modal-body-content {
                    position: relative;
                    box-sizing: border-box;
                    border-radius: 0.2rem;
                    padding: 0.2rem 0.2rem 0.2rem 0.5rem;
                    font-size: 0.8em;
                    color: white;
                    text-align: left;
                }
                .addScheduleBtn {
                    margin: 1rem;
                    color:#7e7d7d;
                    border-width: 0.1rem;
                    padding: 0.3rem;
                    border-style: solid;
                    border-radius: 50%;
                }
    }
        }
    }
    

</style>