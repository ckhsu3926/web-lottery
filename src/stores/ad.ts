import { reactive } from 'vue';

const config = reactive({
  enable: true,
  href: 'https://google.com',
  imagePath: '/ad.PNG',
  title: '全台瘋搶，固力伸限時買1送3',
  description:
    '折扣完再加碼!日本No.1固力葡萄糖胺，豪禮送不完，限時買1送3，最高送到半個月，還要給你85折',
  name: '三得利健益',
});

export default () => {
  return {
    config,
  };
};
