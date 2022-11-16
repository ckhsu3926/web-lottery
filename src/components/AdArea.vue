<template>
  <div v-if="config.enable" class="q-px-xl q-py-lg bg-grey-4">
    <div class="row full-width relative-position cursor-pointer">
      <q-icon
        name="o_info"
        size="24px"
        color="primary"
        class="absolute-top-right cursor-pointer"
        style="margin-top: 10px; margin-right: 40px"
        @click="onSecretDialogOpen"
      />
      <q-icon
        name="o_cancel"
        size="24px"
        color="primary"
        class="absolute-top-right z-top cursor-pointer"
        style="margin-top: 10px; margin-right: 10px"
        @click="config.enable = false"
      />
      <div class="col-12 col-md-5">
        <q-img :src="config.imagePath" fit="fill" style="min-height: 400px" />
      </div>
      <div class="col-12 col-md-7 bg-white" style="min-height: 400px">
        <div class="fit column text-h5">
          <div class="col-10">
            <div
              class="fit column justify-evenly"
              :class="`q-px-${$q.screen.name}`"
            >
              <div class="text-h3">{{ config.title }}</div>
              <div class="text-grey-6">{{ config.description }}</div>
            </div>
          </div>
          <div class="col-2">
            <q-separator />
            <div
              class="fit row justify-between content-center"
              :class="`q-px-${$q.screen.name}`"
            >
              <div>{{ config.name }}</div>
              <a
                target="_blank"
                :href="config.href"
                style="text-decoration: none"
                >了解詳情<q-icon
                  name="arrow_forward_ios"
                  style="padding-bottom: 6px"
              /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import adStore from 'stores/ad';
import drawStore from 'stores/draw';

export default defineComponent({
  setup() {
    const { config } = adStore();
    const { onSecretDialogOpen } = drawStore();

    const onAdClick = () => {
      window.open(config.href);

      return;
    };

    return { config, onAdClick, onSecretDialogOpen };
  },
});
</script>
