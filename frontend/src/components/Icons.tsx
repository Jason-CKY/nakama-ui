import React from 'react';
import { BsDot } from 'react-icons/bs';

export enum StatusEnum {
    live = '#59f754', // app is online
    unavailable = 'red', // app is down
    progress = 'yellow' // in progress
}

export interface IStatusIconProps {
    status: StatusEnum;
    size?: string;
}

export function StatusIcon({ status, size }: IStatusIconProps) {
    return <BsDot size={!!size ? size : '20'} color={status} />;
}
