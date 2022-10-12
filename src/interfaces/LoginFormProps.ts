export default interface LoginFormProps {
  signIn: (email: string) => void;
  isLoginProcessing: boolean;
  isMenuOpened: boolean;
}
