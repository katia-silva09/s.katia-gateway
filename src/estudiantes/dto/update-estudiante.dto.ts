import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateEstudianteDto {
  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  paterno?: string;

  @IsOptional()
  @IsString()
  materno?: string;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsNumber()
  @IsOptional()
  sexo_id?: number;

  @IsNumber()
  @IsOptional()
  etnia_id?: number;

  @IsDate()
  @IsOptional()
  updated_at: Date;
}
