import React from 'react';
import styled from '@emotion/styled';
import classnames from 'classnames';
import getCxIcon from '@uc/cx-icons';

interface IconProps extends React.HTMLAttributes<HTMLElement>, IconWrapperProps {
  className?: string;
  left?: boolean;
  right?: boolean;
  name: string;
}

interface IconWrapperProps {
  size?: string;
}

const I = styled.i<IconWrapperProps>`
  width: ${({ size }: IconWrapperProps): string | undefined => size};
  height: ${({ size }: IconWrapperProps): string | undefined => size};
  svg {
    height: ${({ size }: IconWrapperProps): string | undefined => size};
    width: ${({ size }: IconWrapperProps): string | undefined => size};
  }
`;

export function Icon(props: IconProps): JSX.Element {
  const { left, right, name, className, ...rest } = props;
  const classNames = classnames(
    'cx-icon',
    'cx-btn-icon',
    { 'cx-btn-icon--left': left },
    { 'cx-btn-icon--right': right },
    className
  );

  const icon = getCxIcon(name);

  return <I dangerouslySetInnerHTML={{ __html: icon }} className={classNames} {...rest} />;
}

export function ExitIcon(props): JSX.Element {
  return <Icon name="cx-icon-x_16x16" {...props} />;
}

export function EllipsisIcon(props): JSX.Element {
  return <Icon name="cx-icon-verticalEllipsis_16x16" {...props} />;
}

export function TrashIcon(props): JSX.Element {
  return <Icon name="cx-icon-trash_16x16" {...props} />;
}
