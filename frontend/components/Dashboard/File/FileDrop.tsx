import React, { useRef, useEffect } from "react";

type Props = {
  onFileDrop: (files: File) => void;
};

const FileDrop: React.FC<Props> = ({ onFileDrop }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  const handleDrag = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent) => {
    event.preventDefault();
    event.stopPropagation();

    //
    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      onFileDrop(event.dataTransfer.files[0]);
      event.dataTransfer.clearData();
    }
  };

  useEffect(() => {
    // Add event listeners to the drop container
    const dropElement = dropRef.current;
    if (dropElement) {
      dropElement.addEventListener("dragenter", handleDrag);
      dropElement.addEventListener("dragover", handleDrag);
      dropElement.addEventListener("dragleave", handleDrag);
      dropElement.addEventListener("drop", handleDrop);
    }

    // Remove event listeners on cleanup
    return () => {
      if (dropElement) {
        dropElement.removeEventListener("dragenter", handleDrag);
        dropElement.removeEventListener("dragover", handleDrag);
        dropElement.removeEventListener("dragleave", handleDrag);
        dropElement.removeEventListener("drop", handleDrop);
      }
    };
  }, [dropRef]);

  return (
    <div
      ref={dropRef}
      className="flex flex-col items-center justify-center h-64 p-4 bg-gray-200 rounded-lg text-gray-800 text-xl font-bold"
    >
      Drag and drop a file here
    </div>
  );
};

export default FileDrop;
