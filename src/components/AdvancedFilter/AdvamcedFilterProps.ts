import { ChangeEvent } from 'react';

export default interface AdvamcedFilterProps {
  onChange: (event: ChangeEvent<HTMLInputElement>, name: string) => void;
}
