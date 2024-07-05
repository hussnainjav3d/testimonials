import { Injectable } from '@nestjs/common';

@Injectable()
export class TestimonialsService {
  findAll() {
    return `Return all testimonials`;
  }
  findOne(id: string) {
    return `Find testimonial by id: ${id}`;
  }

  create(data: any) {
    return `Create new testimonial: ${JSON.stringify(data)}`;
  }

  update(id: string, data: any) {
    return `Update testimonial by id: ${id} with data: ${JSON.stringify(data)}`;
  }

  delete(id: string) {
    return `Delete testimonial by id: ${id}`;
  }
}
