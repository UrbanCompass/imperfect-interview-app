import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import { StylesConfig } from 'react-select/src/styles';

import { ListingAttribute, Media, ProcessedListing } from '@/types';
import { getBaths, getBeds, getListingStatus, getPrice, getSqft, getTextSource } from '@/utils';

interface ListingAttributeDropdownProps {
  index: number;
  listing: ProcessedListing;
  media: Media[];
  handleSelectAttribute: (
    index: number,
    attribute: ListingAttribute,
    label: string,
    text: string
  ) => void;
}

const SQFT_LABEL = 'Square Feet';
const PRICE_LABEL = 'Price';
const BEDS_LABEL = 'Beds';
const BATHS_LABEL = 'Baths';
const STATUS_LABEL = 'Listing Status';

const customStyles: StylesConfig = {
  control: (base, state) => ({
    ...base,
    borderColor: state.isFocused ? 'var(--cx-color-darkInteractive)' : 'var(--cx-color-border)',
    borderRadius: 'var(--cx-borderRadius)',
    boxShadow: undefined,
    '&:hover': !state.isFocused && {
      borderColor: 'var(--cx-color-interactive)',
    },
  }),
  option: (base, state) => ({
    ...base,
    color: state.isSelected ? 'var(--cx-color-selectedText)' : 'var(--cx-color-text)',
    backgroundColor: state.isSelected
      ? 'var(--cx-color-selectedBackground)'
      : 'var(--cx-color-background)',
    '&:hover': !state.isSelected && {
      color: 'var(--cx-color-interactive)',
      backgroundColor: 'var(--cx-color-faintNeutral)',
    },
    cursor: 'pointer',
  }),
  placeholder: (base) => ({
    ...base,
    color: 'var(--cx-color-mediumNeutral)',
  }),
};

export function ListingAttributeDropdown({
  index,
  listing,
  media,
  handleSelectAttribute,
}: ListingAttributeDropdownProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<{
    id: ListingAttribute;
    label: string;
    value: string | null;
  } | null>();

  function handleChange(option): void {
    setSelectedOption(option);
    handleSelectAttribute(index, option?.id, option?.label, option?.value);
  }

  const options = [
    { id: ListingAttribute.SQFT, label: SQFT_LABEL, value: getSqft(listing) },
    { id: ListingAttribute.PRICE, label: PRICE_LABEL, value: getPrice(listing) },
    { id: ListingAttribute.BEDS, label: BEDS_LABEL, value: getBeds(listing) },
    { id: ListingAttribute.BATHS, label: BATHS_LABEL, value: getBaths(listing) },
    { id: ListingAttribute.STATUS, label: STATUS_LABEL, value: getListingStatus(listing) },
  ];

  const optionsForDisplay = options.filter((option) => option.value !== null);

  useEffect(() => {
    const selectedAttribute = getTextSource(media, index);
    setSelectedOption(optionsForDisplay.find((option) => option.id === selectedAttribute) || null);
  }, [index, media]);

  if (optionsForDisplay.length === 0) {
    return <></>;
  }

  return (
    <Select
      inputId={`listing-attributes-${index}`}
      placeholder="Select from listing data"
      onChange={handleChange}
      options={optionsForDisplay}
      value={selectedOption}
      isSearchable={false}
      isClearable={true}
      menuPlacement="auto"
      styles={customStyles}
    />
  );
}
