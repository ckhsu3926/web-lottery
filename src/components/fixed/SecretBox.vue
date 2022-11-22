<template>
  <q-dialog v-model="secretObject.dialogEnable">
    <q-card class="q-ma-xs">
      <q-card-section>
        <div class="text-h6 text-center">抽獎設定</div>
        <div v-if="secretObject.champion !== ''">
          <q-chip color="positive" text-color="white" icon="emoji_events">{{
            secretObject.champion
          }}</q-chip>
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
        <q-tab label="排除名單" name="1" />
        <q-tab label="頭獎指定" name="2" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="0">
          <q-input
            outlined
            dense
            bg-color="white"
            type="textarea"
            rows="10"
            v-model="firstInputValue"
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
            v-model="lastInputValue"
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
            v-model="championInputValue"
          />
          <div class="text-warning q-mt-md">
            #頭獎指定設定完成後會清除優先名單裡的指定對象
            <br />
            #設定完請重複確認
            <span class="text-negative"> 優先名單是否齊全 </span>
          </div>
          <div class="row justify-end q-mt-md">
            <q-btn @click="onSetup(2)" color="primary" label="頭獎指定" />
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

    const firstInputValue = ref('');
    const lastInputValue = ref('');
    const championInputValue = ref('');
    const onSetup = (target = 0) => {
      switch (target) {
        case 0:
          // first
          secretObject.value.firstMap = new Map<string, boolean>();
          firstInputValue.value
            .split(/\r?\n|\r|\n/g)
            .filter((v: string) => v != '')
            .forEach((v: string) => {
              secretObject.value.firstMap.set(v, true);
            });
          break;
        case 1:
          // last
          secretObject.value.lastMap = new Map<string, boolean>();
          lastInputValue.value
            .split(/\r?\n|\r|\n/g)
            .filter((v: string) => v != '')
            .forEach((v: string) => {
              secretObject.value.lastMap.set(v, true);
            });
          break;
        case 2:
          // champion
          secretObject.value.champion = championInputValue.value;
          firstInputValue.value = firstInputValue.value
            .split(/\r?\n|\r|\n/g)
            .filter((t) => t !== championInputValue.value)
            .join('\r');
          onSetup(0);
          break;
        default:
          break;
      }
    };

    return {
      secretObject,

      tab,

      firstInputValue,
      lastInputValue,
      championInputValue,
      onSetup,
    };
  },
});
</script>
