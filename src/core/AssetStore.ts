// AssetStore.ts
export const AssetStore = {
    sheets: new Map(),

    addSheet(name: string, sheet: any) {
        this.sheets.set(name, sheet);
    },

    getSheet(name: string) {
        return this.sheets.get(name);
    }
};
