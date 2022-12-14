<template>
  <div class="signup-input">
    <div class="border" :class="{ 'cursor-on': isCursorOn, 'border-red': !(err === null)}">
      <p
        class="placeholder"
        :class="{ up: !(inputModel.length == 0 && isCursorOn == false) }"
      >
        {{ placeholder }}
      </p>
      <input
        v-model="inputModel"
        :type="type"
        @input="$emit('update:modelValue', inputModel)"
        @focus="isCursorOn = true"
        @blur="isCursorOn = false"
      />
    </div>
    <p class="msg" v-show="!(err === null)">{{ err }}</p>
  </div>
</template>

<script>
//inputModel.length == 0 and isCursorOn == false: input 겹치게

export default {
  props: ["modelValue", "placeholder", "type", "err"],
  emits: ["update:modelValue"],
  data: function () {
    return {
      inputModel: this.modelValue,
      isCursorOn: false,
    };
  },
  computed: {},
  methods: {},
};
</script>

<style lang="scss" scoped>
.signup-input {
  margin: {
    bottom: 1em;
  }
}
p {
  margin: 0;
  box-sizing: border-box;
  text-align: left;
}

input {
  border: none;
  background: transparent;
  font-size: 1em;
  outline: none;
  font-style: inherit;
  padding: {
    top: 0.5em;
    bottom: 0.5em;
    left: 1em;
    right: 1em;
  }
  width: 100%;
  display: block;
  box-sizing: border-box;
}

.border {
  position: relative;
  border: none;
  box-sizing: border-box;
  background-color: white;
  border-radius: 5px;

  &.cursor-on {
    border-color: #888888;
  }

  &.border-red {
    border-color: red !important;
  }

  .placeholder {
    position: absolute;
    width: 100%;
    padding: {
      top: 0.5em;
      bottom: 0.5em;
      left: 1em;
      right: 1em;
    }
    top: 0;
    left: 0;
    pointer-events: none;
    transition: all 0.3s;
    font-size: 0.9rem;
    color: rgb(60, 59, 59);

    &.up {
      //top: -1em;
      //left: 0.5em;
      transform: translate(0.5em, -1em);
      font-size: 0.8em;
      background: transparent;
      display: inline-block;
      width: fit-content;
      padding: {
        top: 0;
        bottom: 0;
        left: 0.25em;
        right: 0.25em;
      }
    }
  }
}
.msg {
  margin: 0.3rem;
  color: red;
  font-size: 0.5rem;
}
</style>