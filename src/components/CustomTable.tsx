"use client";

import { Skeleton, Table } from "@radix-ui/themes";
import React from "react";

type CustomTableProps = {
  headers: string[];
  rows: string[][];
  loading?: boolean;
};

const CustomTable = ({ headers, rows, loading = false }: CustomTableProps) => {
  const LoadingSkeleton = () => {
    return Array.from({ length: 5 }).map((_, rowIndex) => (
      <Table.Row key={rowIndex}>
        {headers.map((_, cellIndex) => (
          <Table.Cell key={cellIndex}>
            <Skeleton />
          </Table.Cell>
        ))}
      </Table.Row>
    ));
  };

  return (
    <Table.Root layout="auto">
      <Table.Header>
        <Table.Row>
          {headers.map((header, index) => (
            <Table.ColumnHeaderCell key={index}>
              {header}
            </Table.ColumnHeaderCell>
          ))}
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {rows.length
          ? rows.map((row, rowIndex) => (
              <Table.Row key={rowIndex} className="text-base font-medium">
                {row.map((cell, cellIndex) =>
                  cellIndex === 0 ? (
                    <Table.RowHeaderCell key={cellIndex}>
                      {Array.isArray(cell)
                        ? cell.map((item, idx) => (
                            <div key={idx}>
                              <span
                                className={`${idx !== 0 && "font-light text-xs"}`}
                              >
                                {item}
                              </span>
                            </div>
                          ))
                        : cell}
                    </Table.RowHeaderCell>
                  ) : (
                    <Table.Cell key={cellIndex}>{cell}</Table.Cell>
                  )
                )}
              </Table.Row>
            ))
          : loading && <LoadingSkeleton />}
      </Table.Body>
    </Table.Root>
  );
};

export default CustomTable;
