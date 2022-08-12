import { Injectable, PipeTransform, Logger } from "@nestjs/common";

@Injectable()
export class Freezepipe implements PipeTransform {
    private readonly logger = new Logger(Freezepipe.name);

    transform(value: any) {
        this.logger.debug('Freeze pipe is running...')
        Object.freeze(value);
        return value;
    }
}