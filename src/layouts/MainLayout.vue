<template>
  <q-layout view="lHh Lpr lFf">
    <div class="bg-primary">
      <q-toolbar>
        <q-toolbar-title
          class="text-center text-h3 text-weight-bold text-white"
        >
          線上抽獎工具
        </q-toolbar-title>
      </q-toolbar>
    </div>

    <AdArea />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.q-toolbar {
  height: 25vh;
  max-height: 140px;
  text-shadow: 1px 1px 10px rgb(0 0 0 / 30%);
}
</style>

<script lang="ts">
import { defineComponent } from 'vue';
import AdArea from 'components/AdArea.vue';

export default defineComponent({
  name: 'MainLayout',
  components: { AdArea },
});
</script>
