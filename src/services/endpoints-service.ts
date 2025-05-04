import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  SelectedHost,
} from '../endpoints-stringify-action.arg';

@Injectable()
export class EndpointsService {
  constructor() { }

  stringifyEndpoints(
    selectedHosts: SelectedHost[]
  ) {
    try {
      return JSON.stringify(selectedHosts);
    } catch (err) {
      throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
