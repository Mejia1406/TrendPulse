export class CreatePublicationStatsDto {
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  viewsCount: number;
  url: string;
  captureAt: Date;
  trendId: number;
}