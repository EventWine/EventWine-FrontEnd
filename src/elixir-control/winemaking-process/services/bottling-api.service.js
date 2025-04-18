import http from "../../../shared/services/http-common.js";

export class BottlingApiService {

    constructor(_resourceEndpoint) {
        this.resourceEndpoint = "/winemakingProcess";
    }

    // Get Bottling by Batch
    // GET /winemakingProcess/batch/{batchId}/bottling
    getBottlingByBatch(batchId) {
        return http.get(`${this.resourceEndpoint}/batch/${batchId}/bottling`);
    }

    // Create Bottling by Batch
    // POST /winemakingProcess/{batchId}/bottling
    create(batchId, resource) {
        return http.post(`${this.resourceEndpoint}/${batchId}/bottling`, resource);
    }

    // Update Bottling by Batch
    // PUT /winemakingProcess/{batchId}/bottling
    update(batchId, resource) {
        return http.put(`${this.resourceEndpoint}/${batchId}/bottling`, resource);
    }

    // Delete Bottling by Batch
    // DELETE /winemakingProcess/{batchId}/bottling
    delete(batchId) {
        return http.delete(`${this.resourceEndpoint}/${batchId}/bottling`);
    }

}
