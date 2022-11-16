import { boot } from 'quasar/wrappers';
import adStore from 'stores/ad';

declare global {
  interface Window {
    LotteryAdConfig: {
      enable: boolean;
      href: string;
      imagePath: string;
      title: string;
      description: string;
      name: string;
    };
  }
}

export default boot(async () => {
  const { config } = adStore();

  if (window.LotteryAdConfig) {
    config.enable = window.LotteryAdConfig.enable;
    config.href = window.LotteryAdConfig.href;
    config.imagePath = window.LotteryAdConfig.imagePath;
    config.title = window.LotteryAdConfig.title;
    config.description = window.LotteryAdConfig.description;
    config.name = window.LotteryAdConfig.name;
  } else {
    config.enable = false;
  }

  return;
});
