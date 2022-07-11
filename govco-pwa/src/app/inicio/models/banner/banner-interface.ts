import { BannerPrincipalInterface } from "./banner-principal-interface"

export interface BannerInterface {
    data: BannerPrincipalInterface,
    error: string | null,
    mensaje: string | null,
    succeeded: boolean ;
}
