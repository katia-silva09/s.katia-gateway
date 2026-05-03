import { IsEmail, IsOptional, IsString, IsInt, Length } from 'class-validator';

export class UpdateDocenteDto {
  @IsString()
  @Length(2, 60)
  @IsOptional()
  nombres?: string;

  @IsString()
  @Length(2, 60)
  @IsOptional()
  apellidos?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  direccion?: string;

  @IsString()
  @IsOptional()
  @Length(5, 30)
  cedula?: string;

  @IsString()
  @IsOptional()
  @Length(7, 10)
  telefono?: string;

  @IsInt()
  @IsOptional()
  etnia_id?: number;

  @IsInt()
  @IsOptional()
  cargo_id?: number;

  @IsInt()
  @IsOptional()
  sexo_id?: number;
}
