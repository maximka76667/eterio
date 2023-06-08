import React, { useState, MouseEventHandler, useEffect } from 'react';
import './ListViewer.sass';
import ListViewerItem from '../ListViewerItem/ListViewerItem';
// import { DrinkCreate } from '../../interfaces';

interface ListViewerProps {
  onUpdate: (newExtras: string[]) => void;
}

const ListViewer = ({ onUpdate }: ListViewerProps) => {
  const [extras, setExtras] = useState<string[]>([]);
  const [newExtra, setNewExtra] = useState('');

  // Extra adder
  const insertExtra: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();

    setExtras((extras) => {
      return extras.includes(newExtra) ? [...extras] : [...extras, newExtra];
    });
    setNewExtra('');
  };

  function deleteExtra(extraDelete: string) {
    setExtras((extras) => {
      return extras.filter((extra) => extra !== extraDelete);
    });
  }

  function renameExtra(extra: string, newName: string) {
    const index = extras.indexOf(extra);

    const newExtras = [...extras];

    newExtras[index] = newName;

    setExtras(newExtras);
  }

  useEffect(() => {
    onUpdate(extras);
  }, [extras]);

  return (
    <div className='mt-0'>
      <input
        type='text'
        className={`px-1.5 py-1 list-viewer__adder ${
          extras.includes(newExtra) ? 'list-viewer__adder_error' : ''
        }`}
        value={newExtra}
        onChange={(event) => setNewExtra(event.target.value)}
      />
      <button onClick={insertExtra}>Add</button>
      <ul>
        {extras.map((extra) => (
          <li key={extra}>
            <ListViewerItem
              extra={extra}
              saveItem={renameExtra}
              deleteItem={deleteExtra}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListViewer;
