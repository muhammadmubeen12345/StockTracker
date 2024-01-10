import { getCurrentStock } from "../src/stockHandler";

describe("getCurrentStock", () => {
  it("returns the correct stock for a valid SKU", async () => {
    const result = await getCurrentStock("KED089097/68/09");
    expect(result).toEqual({ sku: "KED089097/68/09", qty: 4986 });
  });

  it("throws an error for an invalid SKU", async () => {
    await expect(getCurrentStock("InvalidSKU")).rejects.toThrowError(
      "SKU InvalidSKU not found in stock.json",
    );
  });
});
