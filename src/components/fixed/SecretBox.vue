<template>
  <q-dialog v-model="secretObject.dialogEnable">
    <q-card class="q-ma-xs">
      <q-card-section>
        <div class="text-h6">過濾名單</div>
        <div class="text-subtitle2">
          note: 僅將排序往後放，如果獎項總人數>待抽名單總人數最後還是會抽出來
        </div>
        <q-chip
          v-for="m of ignoreList"
          :key="`secertBoxIgnoreListChip${m}`"
          color="negative"
          text-color="white"
        >
          {{ m }}
        </q-chip>
        <div v-if="ignoreList.length > 0" class="text-right">
          共 {{ ignoreList.length }} 名
        </div>
      </q-card-section>

      <q-separator class="q-mx-md" />

      <q-card-section>
        <div class="row justify-between">
          <div class="text-h6">輸入過濾對象</div>
          <q-btn @click="onIgnoreSetup" color="primary">設定</q-btn>
        </div>
        <div class="text-subtitle2 q-mb-md">設定方法同 待抽名單</div>
        <q-input
          outlined
          dense
          bg-color="white"
          type="textarea"
          rows="10"
          v-model="ignoreInputValue"
        />
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<style lang="sass" scoped>
.q-card
  min-width: 360px
</style>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import drawStore from 'stores/draw';

export default defineComponent({
  name: 'SecretBox',

  setup() {
    const { secretObject } = drawStore();

    const ignoreInputValue = ref('');
    const onIgnoreSetup = () => {
      secretObject.value.targetMap = new Map<string, boolean>();
      ignoreInputValue.value
        .split(/\r?\n|\r|\n/g)
        .filter((v: string) => v != '')
        .forEach((v: string) => {
          secretObject.value.targetMap.set(v, true);
        });
    };

    const ignoreList = computed(() => {
      const tmp = <string[]>[];
      for (const key of secretObject.value.targetMap.keys()) {
        tmp.push(key);
      }
      return tmp;
    });

    return {
      secretObject,

      ignoreInputValue,
      onIgnoreSetup,

      ignoreList,
    };
  },
});
</script>
