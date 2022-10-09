export default interface PopupProps {
  isPopupOpened: boolean;
  closePopup: () => void;
  popupTitle: string;
  loginMessage: string;
}
