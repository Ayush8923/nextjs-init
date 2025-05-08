import React, { ReactNode } from "react";

type BottomSheetProps = {
  hasModalOpen: boolean;
  title: string;
  content: () => ReactNode;
  renderActionItem: () => ReactNode;
};

const BottomSheet = ({
  hasModalOpen,
  title,
  content,
  renderActionItem,
}: BottomSheetProps) => {
  if (!hasModalOpen) {
    return null;
  }
  return (
    <>
      <div className="fixed inset-0 bg-gray-300 bg-opacity-50 z-50"></div>

      <div className="fixed bottom-0 left-0 right-0 flex justify-center z-50">
        <div className="bg-white rounded-t-xl w-full max-w-lg">
          <div className="flex flex-col px-6 py-9">
            <div className="text-center text-2xl font-medium">{title}</div>
            <div className="mt-6 mb-3 text-base font-normal">{content()}</div>

            {renderActionItem()}
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomSheet;
