import React, { useState } from 'react';

interface ListViewerItemProps {
  extra: string;
  deleteItem: (extraDelete: string) => void;
  saveItem: (value: string, newValue: string) => void;
}

const ListViewerItem = ({
  extra,
  deleteItem,
  saveItem
}: ListViewerItemProps) => {
  const [inputValue, setInputValue] = useState(extra);
  const [isEditing, setIsEditing] = useState(false);

  function handleButtonClick() {
    if (isEditing) {
      saveItem(extra, inputValue);
    }

    setIsEditing((isEditing) => !isEditing);
  }

  return (
    <div>
      <input
        disabled={!isEditing}
        value={inputValue}
        onChange={(event) => setInputValue(event.target.value)}
      />
      <button onClick={handleButtonClick}>{isEditing ? 'Save' : 'Edit'}</button>
      <button onClick={() => deleteItem(extra)}>delete</button>
    </div>
  );
};

export default ListViewerItem;
