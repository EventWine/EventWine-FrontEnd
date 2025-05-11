
export class Bottling {

    constructor({ id, batchId, bottlingDate, bottleSizeMl,
                    numberOfBottles, labelType, corkType
    }) {

        this.id = id;
        this.batchId = batchId;
        this.bottlingDate = bottlingDate;
        this.bottleSizeMl = bottleSizeMl;
        this.numberOfBottles = numberOfBottles;
        this.labelType = labelType;
        this.corkType = corkType;
    }
}