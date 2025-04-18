export class InventoryItem {
    constructor({
                    id = 0,
                    name = '',
                    quantity = 0,
                    unit = '',
                    supplier = '',
                    costPerUnit = 0,
                    expiration = '',
                    lastUpdated = '',
                    type = ''
                } = {}) {
        this.id = id;
        this.name = name;
        this.quantity = quantity;
        this.unit = unit;
        this.supplier = supplier;
        this.costPerUnit = costPerUnit;
        this.expiration = expiration;
        this.lastUpdated = lastUpdated;
        this.type = type;
    }
}