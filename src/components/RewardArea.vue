<template>
  <div
    class="full-width q-pt-sm q-pb-xl column"
    :class="`q-pr-${$q.screen.name}`"
  >
    <h4 class="q-ma-xs">
      <q-icon name="thumb_up" class="q-mr-sm" color="primary" />
      <strong>中獎結果 :</strong>
    </h4>

    <q-input
      outlined
      dense
      readonly
      autogrow
      :bg-color="form.isFinished ? 'cyan-1' : 'white'"
      :input-style="{
        color: form.rewardError ? 'red' : 'black',
        'min-height': '195px',
      }"
      type="textarea"
      rows="10"
      v-model="form.reward"
    />

    <div
      class="row justify-end text-h6"
      :class="{ invisible: resultTypeLength < 1 }"
    >
      實際抽出 {{ resultTypeLength }} 種獎項, 共
      {{ resultWinnerLength }} 個得獎人
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import drawStore from 'stores/draw';

export default defineComponent({
  setup() {
    const { form, awardList } = drawStore();

    const resultTypeLength = computed(() => {
      return awardList.value.filter((a) => a.winnerList.length > 0).length;
    });
    const resultWinnerLength = computed(() => {
      let count = 0;
      awardList.value.forEach((a) => (count += a.winnerList.length));
      return count;
    });

    return { form, resultTypeLength, resultWinnerLength };
  },
});
</script>
