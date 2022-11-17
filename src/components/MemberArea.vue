<template>
  <div
    class="full-width q-pt-sm q-pb-xl column relative-position"
    :class="`q-pr-${$q.screen.name}`"
  >
    <h4 class="q-ma-xs">
      <q-icon name="group" class="q-mr-sm" color="primary" />
      <strong>待抽名單 :</strong>
      <q-btn
        size="md"
        style="width: 120px"
        class="q-ml-xl"
        @click="generateMember"
      >
        <strong>產生名單編號</strong>
      </q-btn>
    </h4>

    <q-icon
      name="info"
      class="absolute-top-right q-mt-lg"
      :class="`q-mr-${$q.screen.name}`"
      size="24px"
      color="primary"
    >
      <q-tooltip self="top right">
        <span>說明:一行一筆資料，可複製Excel內容貼上，可多個欄位。</span>
        <br />
        <br />
        <span>輸入範例:</span><br />
        <span>王x明 0911xxx333 daxxx@test.com.tw</span><br />
        <span>陳x花 0912xxx678 flxxx@test.com.tw</span><br />
        <span>李x宏 0911xxx333 thxxx@test.com.tw</span>
      </q-tooltip>
    </q-icon>

    <q-input
      outlined
      dense
      bg-color="white"
      type="textarea"
      rows="10"
      v-model="form.member"
    />

    <div
      class="row justify-end text-h6"
      :class="{ invisible: memberList.length < 1 }"
    >
      共計 {{ memberList.length }} 個參加者
    </div>

    <div class="row justify-around q-mt-md">
      <q-btn
        unelevated
        rounded
        color="primary"
        size="lg"
        style="width: 130px"
        @click="onReward(true)"
      >
        <strong>試抽</strong>
      </q-btn>
      <q-btn
        unelevated
        rounded
        color="primary"
        size="lg"
        style="width: 130px"
        @click="onReward(false)"
      >
        <strong>抽獎</strong>
      </q-btn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { Dialog } from 'quasar';
import drawStore from 'stores/draw';

export default defineComponent({
  setup() {
    const { form, memberList, onReward } = drawStore();

    const generateMember = () => {
      Dialog.create({
        title: '產生名單編號',
        message: '請輸入抽獎人數',
        prompt: {
          model: '',
          type: 'number',
        },
      }).onOk((data: number) => {
        form.value.member = '';
        for (let i = 0; i < data; i++) {
          form.value.member += `第${i + 1}位嘉賓\r`;
        }
      });
    };

    return { form, memberList, generateMember, onReward };
  },
});
</script>
