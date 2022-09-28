export default interface AuthProps {
  signInWithLink: (email: string, magicLink: string) => void;
}
