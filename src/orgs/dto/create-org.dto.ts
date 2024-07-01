import { IsString, IsNotEmpty } from 'class-validator';

export class CreateOrgDto {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty()
  org_name: string;
}
