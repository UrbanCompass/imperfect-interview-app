import React, { useMemo } from 'react';
import { Select } from '@uc/cx.react';
import { ListingStatus } from '@uc/thrift2npme/dist/listing/listing_status';

interface ListingStatusSelectProps {
  onChange: (evt: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string;
  placeholder?: string;
}

export function ListingStatusSelect({
  placeholder,
  ...rest
}: ListingStatusSelectProps): JSX.Element {
  const options = useMemo(() => {
    const memoOptions = placeholder ? [{ value: '-1', label: placeholder }] : [];
    return memoOptions.concat([
      { value: `${ListingStatus.ACTIVE}`, label: 'Active Listings' },
      { value: `${ListingStatus.COMING_SOON}`, label: 'Coming Soon' },
      { value: `${ListingStatus.SOLD}`, label: 'Sold' },
    ]);
  }, [placeholder]);

  return <Select {...rest} options={options} />;
}
