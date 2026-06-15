import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFileDto {
  @IsNumber()
  model_id: number;

  @IsString()
  mime: string;

  @IsOptional()
  @IsString()
  file_name?: string;

  @IsOptional()
  buffer: Buffer;

  @IsOptional()
  @IsString()
  originalName?: string;
}
