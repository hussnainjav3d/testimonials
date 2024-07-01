import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(50)
  project_name: string;
  @IsString()
  @IsNotEmpty()
  org_id: string;
}
