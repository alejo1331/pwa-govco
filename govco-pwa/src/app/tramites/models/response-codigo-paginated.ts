import { CodigoCIIU } from "./codigo-ciiu";

export class ResponseCodigoPaginated {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    filter: string;
    order: string;
    succeeded: boolean;
    errors: string[];
    message: string;
    numOfPages: number;
    data: CodigoCIIU[];
}
