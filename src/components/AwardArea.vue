<template>
  <div
    class="full-width q-pt-sm q-pb-xl column relative-position"
    :class="`q-pr-${$q.screen.name}`"
  >
    <h4 class="q-ma-xs">
      <q-icon name="stars" class="q-mr-sm" color="primary" />
      <strong>獎項設定 :</strong>
    </h4>

    <q-icon
      name="info"
      class="absolute-top-right q-mt-md"
      :class="`q-mr-${$q.screen.name}`"
      size="24px"
      color="primary"
    >
      <q-tooltip self="top right">
        <span>說明:一行一獎項，可多種獎項。</span><br />
        <span>格式:獎品名稱,獎品數量 (預設1)或 只輸入數字(獎品數量)</span>
        <br />
        <br />
        <span>範例:</span><br />
        <span>頭獎汽車 &lt;-- 沒設定數量，預設抽1個</span><br />
        <span>二獎電視機,3 &lt;-- 指定抽3個</span><br />
        <span>普獎現金券,10 &lt;-- 指定抽10個</span><br />
        <span>100 &lt;-- 抽100個</span>
      </q-tooltip>
    </q-icon>

    <q-input
      outlined
      dense
      bg-color="white"
      type="textarea"
      rows="10"
      v-model="form.award"
    />

    <div class="row justify-end text-h6" :class="{ invisible: awardList < 1 }">
      共計 {{ awardList.length }} 個獎項, 共計 {{ awardTotalLength }} 個得獎人
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import drawStore from 'stores/draw';

export default defineComponent({
  setup() {
    const { form, awardList, awardTotalLength } = drawStore();

    return { form, awardList, awardTotalLength };
  },
});
</script>
