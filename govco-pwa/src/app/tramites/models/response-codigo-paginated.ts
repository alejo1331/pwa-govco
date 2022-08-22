import { CodigoCIIU } from "./codigo-ciiu";

export class responseCodigoPaginated {
    pageNumber: number;
    pageSize: number;
    totalRecords: number;
    filter: string;
    order: string;
    succeeded: Boolean;
    errors: string[];
    message: string;
    numOfPages: number;
    data: CodigoCIIU[];
}
