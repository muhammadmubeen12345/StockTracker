import { getCurrentStock } from "./stockHandler";

async function getStockLevel(sku: string): Promise<void> {
  try {
    const stockLevel = await getCurrentStock(sku);
    console.log(stockLevel);
  } catch (error) {
    console.log(error);
  }
}

getStockLevel("KED089097/68/09");
