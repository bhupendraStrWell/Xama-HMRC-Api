import {
    IsString,
    IsOptional,
    ValidateNested,
    IsObject,
    IsEmail,
    IsDateString,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  class PrimaryAddressDto {
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
  }
  
  class PrimaryContactDto {
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
  
    @IsOptional()
    @IsDateString()
    date_of_birth?: string;
  
    @IsOptional()
    @IsDateString()
    driving_license_expiry_date?: string;
  
    @IsOptional()
    @IsString()
    driving_license_number?: string;
  
    @IsOptional()
    @IsString()
    passport_number?: string;
  
    @IsOptional()
    @IsDateString()
    passport_expiry_date?: string;
  
    @ValidateNested()
    @Type(() => PrimaryAddressDto)
    primary_address: PrimaryAddressDto;
  }
  
  export class ContactDto {
    @IsString()
    name: string;
  
    @IsString()
    type: string;
  
    @IsOptional()
    @IsString()
    reg_number?: string;
  
    @IsObject()
    metadata: {
      external_reference: string;
    };
  
    @ValidateNested()
    @Type(() => PrimaryContactDto)
    primary_contact: PrimaryContactDto;
  }
  