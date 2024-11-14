import { IsString, IsOptional, IsEmail, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  postcode: string;

  @IsString()
  city: string;

  @IsString()
  country_code: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  created_at?: string;

  @IsOptional()
  @IsString()
  updated_at?: string;
}

class ExternalSourceDto {
  @IsString()
  xama_system: string;

  @IsString()
  entity_type: string;

  @IsString()
  entity_id: string;

  @IsString()
  external_system: string;

  @IsString()
  externalEntityLink: string;

  @IsOptional()
  metadata: Record<string, any>;
}

class MetadataDto {
  @IsString()
  external_reference: string;

  @ValidateNested()
  @Type(() => ExternalSourceDto)
  external_source: ExternalSourceDto;
}

export class AddContactDto {
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  middle_name?: string;

  @IsString()
  last_name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @ValidateNested()
  @Type(() => AddressDto)
  primary_address: AddressDto;

  @ValidateNested()
  @Type(() => MetadataDto)
  metadata: MetadataDto;
}
