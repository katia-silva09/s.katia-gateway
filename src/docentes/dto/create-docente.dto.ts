import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsInt,
  Length,
} from 'class-validator';

export class CreateDocenteDto {
  @IsString()
  @IsNotEmpty()
  @Length(2, 60)
  nombres: string;

  @IsString()
  @IsNotEmpty()
  @Length(2, 60)
  apellidos: string;

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
  @IsNotEmpty()
  etnia_id: number;

  @IsInt()
  @IsNotEmpty()
  cargo_id: number;

  @IsInt()
  @IsNotEmpty()
  sexo_id: number;
}
