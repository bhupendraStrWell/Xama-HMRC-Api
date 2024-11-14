import { Controller } from '@nestjs/common';
import { XamaHttpApisService } from '../services/xama-apis.service';

@Controller('xama-apis')
export class XamaApisController {
  constructor(private readonly xamaApisService: XamaHttpApisService) {}
}
