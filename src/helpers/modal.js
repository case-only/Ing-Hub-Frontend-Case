import '../components/GlobalModal';

const modal = {
  open(title, description) {
    const modalElement = document.querySelector('global-modal');
    if (!modalElement) {
      throw new Error('GlobalModal component is not found in the DOM!');
    }

    return modalElement.open(title, description);
  },
};

export default modal;
