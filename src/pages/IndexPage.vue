<template>
  <q-page :class="`q-pa-${$q.screen.name}`">
    <div class="row">
      <div class="col-12 col-md-6"><TitleArea /></div>
      <div class="col-12 col-md-6"><AwardArea /></div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6"><MemberArea /></div>
      <div class="col-12 col-md-6"><RewardArea /></div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row justify-center">
      <q-btn
        unelevated
        rounded
        color="red"
        size="lg"
        style="width: 180px"
        @click="reset"
      >
        <strong>全部清除</strong>
      </q-btn>
    </div>

    <q-inner-loading :showing="form.rewarding" />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TitleArea from 'components/TitleArea.vue';
import AwardArea from 'components/AwardArea.vue';
import MemberArea from 'components/MemberArea.vue';
import RewardArea from 'components/RewardArea.vue';
import drawStore from 'stores/draw';

export default defineComponent({
  name: 'IndexPage',
  components: { TitleArea, AwardArea, MemberArea, RewardArea },
  setup() {
    const { reset, form } = drawStore();

    return { reset, form };
  },
});
</script>
