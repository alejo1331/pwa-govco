import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CacheStorageService {

  async cacheStorege(url: string, cacheComponent: string, nombreJson: string, tipoArchivo: string) {
    const existe = await caches.has(cacheComponent).then(exist => { return exist })
    switch (existe) {
      case true:
        return caches.match('/' + nombreJson + tipoArchivo).then(json => {
          if (json != undefined) {
            return true
          } else {
            this.putCacheTipoArchivo(url, cacheComponent, nombreJson, tipoArchivo);
            return false
          }
        })
      case false:
        this.putCacheTipoArchivo(url, cacheComponent, nombreJson, tipoArchivo);
        return false;
    }
  }

  putCacheTipoArchivo(url: string, cacheComponent: string, nombreJson: string, tipoArchivo: string) {
    switch (tipoArchivo) {
      case '.json':
        fetch(url).then(response => response.json())
          .then(event => {
            const jsonResponse = new Response(JSON.stringify(event), {
              headers: {
                'content-type': 'application/json'
              }
            });
            caches.open(cacheComponent).then(cache => {
              cache.put(nombreJson + tipoArchivo, jsonResponse);
            })
          })
        break;
      case '.txt':
        break;
      case '.html':
        break;
    }

  }

  getCacheStorage(nombreJson: string, tipoArchivo: string) {
    const json = caches.match('/' + nombreJson + tipoArchivo).then(r => r!.json())
      .then(data => {
        return data;
      });
    return json;
  }
}
