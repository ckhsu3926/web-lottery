import { computed, ref } from 'vue';

interface drawForm {
  isFinished: boolean;
  title: string;
  award: string;
  member: string;
  reward: string;
  rewarding: boolean;
  rewardError: boolean;
}
interface award {
  name: string;
  count: number;
  winnerList: string[];
}

const form = ref(<drawForm>{});
const reset = () => {
  form.value = <drawForm>{};
  awardList.value = [];
};

const memberList = computed(() => {
  if (!form.value.member) {
    return <string[]>[];
  }
  return form.value.member.split(/\r?\n|\r|\n/g).filter((v) => v != '');
});

const awardList = ref(<award[]>[]);
const awardSourceList = computed(() => {
  if (!form.value.award) {
    return <award[]>[];
  }

  const list = <award[]>[];
  form.value.award
    .split(/\r?\n|\r|\n/g)
    .filter((v) => v != '')
    .forEach((value, index) => {
      const tmp = value.split(',');
      let name = '';
      let count = 0;

      if (tmp[1] && Number(tmp[tmp.length - 1])) {
        // abc,20
        name = tmp[0];
        count = Number(tmp[tmp.length - 1]);
      } else if (Number(tmp[0]) && !tmp[1]) {
        // 10
        name = `第${index + 1}獎`;
        count = Number(tmp[0]);
      } else {
        // abc
        name = value;
        count = 1;
      }

      list.push(<award>{
        name: name,
        count: count,
        winnerList: [],
      });
    });

  awardList.value = list;
  return list;
});
const awardTotalLength = computed(() => {
  let count = 0;
  awardSourceList.value.forEach((a) => {
    if (a.count > 0) {
      count += a.count;
    }
  });

  return count;
});

const onReward = (isTest: boolean) => {
  form.value.reward = '';
  form.value.rewarding = true;
  form.value.rewardError = false;

  // validate
  const errors = <string[]>[];
  if (!form.value.title) {
    errors.push('請輸入 抽獎主題');
  }
  if (awardTotalLength.value === 0) {
    errors.push('缺少 獎項');
  }
  if (memberList.value.length === 0) {
    errors.push('缺少 待抽人員');
  }
  if (errors.length > 0) {
    form.value.reward = errors.join('\r');
    form.value.rewarding = false;
    form.value.rewardError = true;
    return;
  }

  // before start
  form.value.reward = `【${form.value.title}】${
    isTest ? '(測試)' : ''
  }\r=============================\r`;
  let rewardTargetList = [...memberList.value];
  for (const award of awardList.value) {
    award.winnerList = [];
  }

  // loop award
  for (const award of awardList.value) {
    form.value.reward += `獎項: ${award.name} (預計抽出 ${award.count} 名)\r`;

    for (let i = 0; i < award.count; i++) {
      if (rewardTargetList.length === 0) {
        break;
      }

      // 抽獎
      const winner = lottery(rewardTargetList);
      rewardTargetList = rewardTargetList.filter((r) => r != winner);
      award.winnerList.push(winner || '');
      form.value.reward += `${winner} ${isTest ? '(測試)' : ''}\r`;
    }
    form.value.reward += `(實際抽出 ${award.winnerList.length} 名)\r=============================\r`;
  }

  form.value.rewarding = false;
  form.value.rewardError = false;
  if (!isTest) {
    form.value.isFinished = true;
  }
};
const lottery = (pool: string[]): string => {
  const min = Math.ceil(0);
  const max = Math.floor(pool.length - 1);
  const result = Math.floor(Math.random() * (max - min + 1) + min);

  return pool[result];
};

export default () => {
  return {
    form,
    memberList,
    awardList,
    awardTotalLength,

    reset,
    onReward,
  };
};
