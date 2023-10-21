import type { Ref } from 'vue';

interface UseExpandTransitionArgs {
  afterOpen?: Function
  afterClose?: Function
  getDisabled?: Function
}

type UseExpandTransition = (options?: UseExpandTransitionArgs) => {
  isExpand: Ref<boolean>
  handleExpandStatus: (isToggle: boolean, status?: boolean) => void
};

const useExpandTransition: UseExpandTransition = (options = {}) => {
  const isExpand = ref(false);

  const handleExpandStatus = (isToggle = true, status = false) => {
    if (options.getDisabled) {
      if (options.getDisabled()) {
        return;
      }
    }

    if (isToggle) {
      // console.log('isToggle');
      isExpand.value = !isExpand.value;
    }
    else {
      // console.log('isNotToggle');
      isExpand.value = status;
    }

    if (isExpand.value) {
      if (options.afterOpen) {
        options.afterOpen();
      }
    }

    if (!isExpand.value) {
      if (options.afterClose) {
        options.afterClose();
      }
    }
  };

  return {
    isExpand,
    handleExpandStatus,
  };
};

export default useExpandTransition;
