import React from "react";
import Button from "./Button";

type DeleteModalProps = {
  hasDeleteModal: boolean;
  title: string;
  content: string;
  onHandleDelete: () => void;
  isApiLoading: boolean;
  onHandleCancel: () => void;
};

const DeleteModal = ({
  hasDeleteModal,
  title,
  content,
  onHandleDelete,
  isApiLoading,
  onHandleCancel,
}: DeleteModalProps) => {
  if (!hasDeleteModal) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50"></div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="bg-white rounded-t-xl w-full max-w-lg">
          <div className="flex flex-col px-6 py-9">
            <div className="text-center text-2xl font-medium">{title}</div>
            <div className="mt-6 mb-3 text-base font-normal">{content}</div>

            <Button
              type="button"
              className="w-full"
              title="Delete"
              onClick={onHandleDelete}
              disabled={isApiLoading}
              loading={isApiLoading}
            />

            <Button
              type="button"
              className="w-full"
              title="Cancel"
              variant="secondary"
              onClick={onHandleCancel}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteModal;
