import React, { ReactNode } from "react";
import { BottomSheet, Button } from "@/components";

type DeleteModalProps = {
  hasDeleteModal: boolean;
  title: string;
  content: () => ReactNode;
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

  const renderActionItems = () => {
    return (
      <>
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
      </>
    );
  };

  return (
    <>
      <BottomSheet
        hasModalOpen={hasDeleteModal}
        title={title}
        content={content}
        renderActionItem={renderActionItems}
      />
    </>
  );
};

export default DeleteModal;
