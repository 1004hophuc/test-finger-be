import { ApiProperty } from '@nestjs/swagger';

/**
 * Query user dto Class
 */
export class QueryUserDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;
}
