import type { BlockTag } from '@ethersproject/abstract-provider';

export interface IBlockProps {
    blockNumber: BlockTag
}

export interface IMaintenanceRecord {
    mileage: number;
    description: string;
    timestamp: number;
}