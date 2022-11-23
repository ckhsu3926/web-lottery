<template>
  <q-dialog v-model="secretObject.dialogEnable">
    <q-card class="q-ma-xs">
      <q-card-section>
        <div class="text-h6 text-center">抽獎設定</div>
        <div v-if="secretObject.championMap.size > 0">
          <q-chip
            v-for="m of secretObject.championMap.keys()"
            :key="`secertBoxChampionListChip${m}`"
            color="positive"
            text-color="white"
            icon="emoji_events"
            >{{ m }}</q-chip
          >
        </div>
        <div v-if="secretObject.firstMap.size > 0">
          <q-chip
            v-for="m of secretObject.firstMap.keys()"
            :key="`secertBoxFirstListChip${m}`"
            color="primary"
            text-color="white"
          >
            {{ m }}
          </q-chip>
        </div>
        <q-chip> 未標註名單 </q-chip>
        <div v-if="secretObject.lastMap.size > 0">
          <q-chip
            v-for="m of secretObject.lastMap.keys()"
            :key="`secertBoxLastListChip${m}`"
            color="negative"
            text-color="white"
          >
            {{ m }}
          </q-chip>
        </div>
      </q-card-section>

      <q-separator />

      <q-tabs v-model="tab" class="text-teal">
        <q-tab label="優先名單" name="0" />
        <q-tab label="剔除名單" name="1" />
        <q-tab label="頭獎名單" name="2" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="0">
          <q-input
            outlined
            dense
            bg-color="white"
            type="textarea"
            rows="10"
            v-model="firstInput"
          />
          <div class="row justify-end q-mt-md">
            <q-btn @click="onSetup(0)" color="primary">設定</q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="1">
          <q-input
            outlined
            dense
            bg-color="white"
            type="textarea"
            rows="10"
            v-model="lastInput"
          />
          <div class="row justify-end q-mt-md">
            <q-btn @click="onSetup(1)" color="primary">設定</q-btn>
          </div>
        </q-tab-panel>

        <q-tab-panel name="2">
          <q-input
            outlined
            dense
            bg-color="white"
            type="textarea"
            rows="10"
            v-model="championInput"
          />
          <div class="text-warning">
            # 僅作用在第一獎項設定
            <br />
            # 待抽名單、第一獎項有符合時會先將此名單抽完
            <br />
            # 若 此名單抽完 且 第一獎尚未抽完 將抽優先名單
            <br />
            # 第二獎開始無關此名單，僅確認優先名單
          </div>
          <div class="row justify-end q-mt-md">
            <q-btn @click="onSetup(2)" color="primary" label="設定" />
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.q-card
  min-width: 360px
</style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import drawStore from 'stores/draw';

export default defineComponent({
  name: 'SecretBox',

  setup() {
    const { secretObject } = drawStore();

    const tab = ref('0');

    const firstInput = ref('');
    const lastInput = ref('');
    const championInput = ref('');
    const onSetup = (target = 0) => {
      switch (target) {
        case 0:
          // first
          secretObject.value.firstMap = new Map<string, boolean>();
          firstInput.value
            .split(/\r?\n|\r|\n/g)
            .filter((v: string) => v != '')
            .forEach((v: string) => {
              secretObject.value.firstMap.set(v, true);
            });
          break;
        case 1:
          // last
          secretObject.value.lastMap = new Map<string, boolean>();
          lastInput.value
            .split(/\r?\n|\r|\n/g)
            .filter((v: string) => v != '')
            .forEach((v: string) => {
              secretObject.value.lastMap.set(v, true);
            });
          break;
        case 2:
          // champion
          secretObject.value.championMap = new Map<string, boolean>();
          championInput.value
            .split(/\r?\n|\r|\n/g)
            .filter((v: string) => v != '')
            .forEach((v: string) => {
              secretObject.value.championMap.set(v, true);
            });
          break;
        default:
          break;
      }
    };

    return {
      secretObject,

      tab,

      firstInput,
      lastInput,
      championInput,
      onSetup,
    };
  },
});
</script>
