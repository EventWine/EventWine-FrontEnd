import http from "../../../shared/services/http-common.js";
import { InventoryItem } from "../model/inventory.entity.js";

export class InventoryProcessApiService {
    resourceEndpoint = "/inventory";

    getAll() {
        return http.get(this.resourceEndpoint).then(res => res.data.map(i => new InventoryItem(i)));
    }

    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    create(data) {
        return http.post(this.resourceEndpoint, data);
    }

    update(id, data) {
        return http.put(`${this.resourceEndpoint}/${id}`, data);
    }

    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }
}
