import React from 'react';

interface GenericListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

export function GenericList<T>({ items, renderItem, className = '' }: GenericListProps<T>) {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <div key={index}>{renderItem(item)}</div>
      ))}
    </div>
  );
} 