<template>
  <div
    class="full-width q-pt-sm q-pb-xl column"
    :class="`q-pr-${$q.screen.name}`"
  >
    <h4 class="q-ma-xs">
      <q-icon name="redeem" class="q-mr-sm" color="primary" />
      <strong>抽獎主題 :</strong>
    </h4>
    <q-input outlined bg-color="white" v-model="form.title" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import drawStore from 'stores/draw';

export default defineComponent({
  setup() {
    const { form } = drawStore();

    return { form };
  },
});
</script>
