import React from 'react';
import { Button, Space } from 'antd';

interface btnProps {
  text: string;
  icon?: JSX.Element;
  loading?: boolean;
  type?:
    | 'text'
    | 'link'
    | 'ghost'
    | 'primary'
    | 'default'
    | 'dashed'
    | undefined;
  size?: 'small' | 'middle' | 'large' | undefined;
  handleClick?: React.MouseEventHandler<HTMLElement> | undefined;
  className?: string;
}

const BasicBtn = ({
  text,
  icon,
  loading,
  type,
  size,
  handleClick,
  className,
}: btnProps) => {
  return (
    <Button
      className={className}
      type={type ? type : 'primary'}
      loading={loading}
      size={size ? size : 'small'}
      icon={icon && icon}
      onClick={handleClick}
    >
      {text ? text : 'Random'}
    </Button>
  );
};

export default BasicBtn;
