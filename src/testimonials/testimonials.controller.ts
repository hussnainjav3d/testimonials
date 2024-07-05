import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { TestimonialsService } from './testimonials.service';
import { AuthorizedRole } from 'src/auth/role-decorator';
import { RolesEnum } from 'src/auth/utility/enums';
import { AuthGuard, AuthRGuard } from 'src/auth/auth.guard';

@Controller('testimonials')
export class TestimonialsController {
  constructor(private readonly testimonialsService: TestimonialsService) {}

  @Get()
  @UseGuards(AuthGuard, AuthRGuard)
  findAll() {
    return this.testimonialsService.findAll();
  }

  @Get(':id')
  @AuthorizedRole(RolesEnum.EDITOR, RolesEnum.READER, RolesEnum.MANAGER)
  @UseGuards(AuthGuard, AuthRGuard)
  findOne(@Param('id') id: string) {
    return this.testimonialsService.findOne(id);
  }
}
