// Samuel Moncada Mejía
import type { TrendInterface } from '@/interfaces/TrendInterface';

export interface SocialMediaInterface {
    id: string,
    name: string,
    logo: string,
    color: string,
    createdAt: string,
    updatedAt: string,
    trends?: TrendInterface[];
}