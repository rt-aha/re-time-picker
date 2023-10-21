import { ref } from 'vue';
import type { Ref } from 'vue';

export type UseCalcElement = (getElement: () => HTMLElement) => {
  //
  showPosition: Ref<string>
  // calculate the dropdown show position
  calcShowPosition: () => void
};

const useCalcElement: UseCalcElement = (getElement) => {
  const showPosition = ref('bottom');
  const calcShowPosition = () => {
    const targetEle = getElement();
    const bodyHeight = window.innerHeight;
    const offsetToElement = targetEle.getBoundingClientRect();

    if (bodyHeight - offsetToElement.bottom > 200) {
      showPosition.value = 'bottom';
      return;
    }

    showPosition.value = 'top';
  };

  return {
    calcShowPosition,
    showPosition,
  };
};

export default useCalcElement;
