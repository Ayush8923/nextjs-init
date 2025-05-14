"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components";
import { CheckIcon } from "@/components/icons";
import { cigarFilterCategories } from "@/lib/constant";

type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onApply: (_filters: { [key: string]: string }) => void;
  centered?: boolean;
  cigarOptionsData?: {
    brands: string[];
    wrappers: string[];
    binders: string[];
    fillers: string[];
    strengths: string[];
    manufacturers?: string[];
  };
};

const categoryOptionMap: {
  [key: string]: keyof NonNullable<FilterModalProps["cigarOptionsData"]>;
} = {
  brand: "brands",
  wrapper: "wrappers",
  binder: "binders",
  filler: "fillers",
  strength: "strengths",
  manufacturer: "manufacturers",
};

const FilterModal = ({
  isOpen,
  onClose,
  onApply,
  centered = false,
  cigarOptionsData,
}: FilterModalProps) => {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string;
  }>({});
  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");

  const getOptionsForCategory = (categoryId: string): string[] => {
    const key = categoryOptionMap[categoryId];
    if (!key || !cigarOptionsData) return [];
    return cigarOptionsData[key] || [];
  };

  const hasOptions = (categoryId: string): boolean => {
    return getOptionsForCategory(categoryId).length > 0;
  };

  useEffect(() => {
    const firstAvailableCategory = cigarFilterCategories.find((category) =>
      hasOptions(category.id)
    );
    if (firstAvailableCategory) {
      setSelectedFilterCategory(firstAvailableCategory.id);
    }
  }, [cigarOptionsData]);

  if (!isOpen) return null;

  const positionClass = centered
    ? "fixed inset-0 flex items-center justify-center"
    : "fixed bottom-0 left-0 right-0 flex justify-center";

  const containerClass = centered
    ? "bg-white rounded-2xl w-full max-w-lg mx-4"
    : "bg-white rounded-t-3xl w-full max-w-lg mx-4";

  const renderFilterOptions = () => {
    const options = getOptionsForCategory(selectedFilterCategory);

    return options.map((option) => {
      const isSelected = selectedFilters[selectedFilterCategory] === option;

      return (
        <div
          key={option}
          className="px-5 pb-5 flex justify-between items-center cursor-pointer text-base font-extralight"
          onClick={() =>
            setSelectedFilters((prev) => ({
              ...prev,
              [selectedFilterCategory]: option,
            }))
          }
        >
          <span>{option}</span>
          {isSelected && <CheckIcon />}
        </div>
      );
    });
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-gray-300 bg-opacity-50 z-50"
        onClick={onClose}
      ></div>

      <div className={`${positionClass} z-50 -mx-6`}>
        <div className={containerClass}>
          <div className="flex flex-col">
            <button
              className="flex justify-end text-red-500 px-6 py-6 text-sm font-medium uppercase"
              onClick={() => setSelectedFilters({})}
            >
              Clear All
            </button>
            <div className="flex">
              <div className="w-1/3 border-r">
                {cigarFilterCategories.map((category) => {
                  if (!hasOptions(category.id)) return null;

                  return (
                    <div
                      key={category.id}
                      className={`pl-6 pb-9 pr-5 cursor-pointer text-base font-medium ${
                        selectedFilterCategory === category.id
                          ? "text-primary-100"
                          : "text-gray-200"
                      }`}
                      onClick={() => setSelectedFilterCategory(category.id)}
                    >
                      {category.label}
                    </div>
                  );
                })}
              </div>

              <div className="w-2/3">
                <div className="h-96 overflow-y-auto">
                  {renderFilterOptions()}
                </div>
              </div>
            </div>
          </div>
          <div className="flex px-6 pb-9 pt-3 gap-5">
            <Button
              className="flex-1"
              variant="secondary"
              title="Cancel"
              onClick={onClose}
            />
            <Button
              className="flex-1"
              variant="primary"
              title="Apply"
              onClick={() => onApply(selectedFilters)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterModal;
