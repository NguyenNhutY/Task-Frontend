import { useState } from "react";

const DragDropList = ({ items }) => {
  const [list, setList] = useState(items);

  const handleDragEnd = (e) => {
    const { oldIndex, newIndex } = JSON.parse(e.dataTransfer.getData("text/plain"));
    const updatedList = [...list];
    const [movedItem] = updatedList.splice(oldIndex, 1);
    updatedList.splice(newIndex, 0, movedItem);
    setList(updatedList);
  };

  return (
    <ul>
      {list.map((item, index) => (
        <li
          key={item.id}
          draggable
          onDragStart={(e) => e.dataTransfer.setData("text/plain", JSON.stringify({ oldIndex: index }))}
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDragEnd(e, index)}
        >
          {item.name}
        </li>
      ))}
    </ul>
  );
};
